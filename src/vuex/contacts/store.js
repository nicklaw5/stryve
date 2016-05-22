import { set } from 'vue'
import store from '../store'
import emojify from 'emojify.js'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import * as helpers from '../../utils/helpers'
import * as userSocket from '../../utils/user-socket'
import { setSearching, fetchContactEvents } from './actions'

// initial module state
const state = {
	searching: false,
	currentContact: null,
	pinnedContacts: {},
	searchContacts: {},
}

// mutations
const mutations = {
	[types.RESET_CONTACTS] (state) {
		set(state, 'searching', false)
		set(state, 'currentContact', null)
		set(state, 'pinnedContacts', {})
		set(state, 'searchContacts', {})
	},

	[types.PIN_CONTACT_SUCCESS] (state, contact) {
		set(state.searchContacts[contact.uuid], 'is_contact', contact.is_contact)

		if(contact.is_contact)
			set(state.pinnedContacts, contact.uuid, addContactProperties(contact))
		else
			delete state.pinnedContacts[contact.uuid]
	},

	[types.PIN_CONTACT_FAILURE] (state, res) {
		// TODO
		console.log(res)
	},

	[types.SEND_CONTACT_MESSAGE] (state, text) {
		sendContactMessage(text, state.currentContact, store._vm.users.user)
		helpers.updateElementsValue('channel_message', '')
	},

	[types.FETCH_CONTACT_EVENTS_SUCCESS] (state, contact_events) {
		// check we have events to add to the contact
		if(!helpers.isNullOrUndefined(contact_events)) {
			// add the events to the contact
			for(let i = contact_events.length - 1; i > -1; i--) {
				// skip empty texts
				if(contact_events[i].event_text == null)
					continue

				contact_events[i].event_text = helpers.parseText(contact_events[i].event_text)

				// add event to contact
				set(
					state.pinnedContacts[state.currentContact].events,
					contact_events[i].event_uuid,
					contact_events[i]
				)
			}
		}

		// channel ready to receive new events
		set(state.pinnedContacts[state.currentContact], 'ready', true)

		// fire resize window event 
		helpers.fireWindowResizeEvent()
		
		// focus on chat message input field
		helpers.focusOnElement('contact_message')
	},

	[types.FETCH_CONTACT_EVENTS_FAILURE] (state, res) {
		//  TODO
		console.log(res)
	},

	[types.SWITCH_CONTACTS] (state, contact_uuid) {
		// no need to do anything if we're looking at the contact
		if(state.currentContact === contact_uuid)
			return

		// loop over the contacts
		for(let key in state.pinnedContacts) {
			if(state.pinnedContacts.hasOwnProperty(key)) {
				// set active contact
				if(state.pinnedContacts[key].uuid === contact_uuid) {
					set(state.pinnedContacts[key], 'active', true)
					set(state, 'currentContact', key)
					// set 'listening' state
					// if(!state.pinnedContacts[key].listening)
					// 	set(state.pinnedContacts[key], 'listening', true)
				} else {
					// set contact to 'inactive'
					set(state.pinnedContacts[key], 'active', false)
				}
			}
		}

		// get the last few events that ocurred between the two users
		if(!state.pinnedContacts[state.currentContact].ready) {
			fetchContactEvents(store, state.pinnedContacts[state.currentContact].uuid)
		}

		// update title with contact username
		helpers.updateTitleText('@' + state.pinnedContacts[state.currentContact].username)

		// fire resize window event 
		helpers.fireWindowResizeEvent()

		// focus on chat message input field
		helpers.focusOnElement('contact_message')
	},

	[types.SET_PINNED_CONTACTS] (state, contacts) {
		if(!helpers.isNullOrUndefined(contacts)) {
			contacts.forEach(contact => {
				contact = addContactProperties(contact)
				set(state.pinnedContacts, contact.uuid, contact)
			})
		}
	},

	[types.RESET_SEARCH_CONTACTS] (state) {
		set(state, 'searchContacts', {})
		setSearching(store, false)
	},

	[types.SET_SEARCHING] (state, boolean) {
		set(state, 'searching', boolean)
	},

	[types.SEARCH_CONTACTS_SUCCESS] (state, contacts) {
		if(!helpers.isNullOrUndefined(contacts)) {
			contacts.forEach(contact => {
				set(state.searchContacts, contact.uuid, contact)
			})
		}
	},

	[types.SEARCH_CONTACTS_FAILURE] (state, res) {
		// setSearching(store, false)
		// TODO
		console.log(res)
	},

	[types.SEND_CONTACT_MESSAGE] (state, text) {
		userSocket.sendContactMessage(text, state.currentContact, store._vm.users.user)
	},

	[types.PUSH_EVENT_TO_CONTACT] (state, payload, isPreliminary) {
		for(let key in state.pinnedContacts) {
			if(state.pinnedContacts.hasOwnProperty(key)) {
				if(payload.recipient_uuid === key || payload.sender_uuid === key) {

					// parse the text for display purposes
					payload.event_text = helpers.parseText(payload.event_text)

					// add temporary event properties for preliminary events
					if(isPreliminary) {
						const user = store._vm.users.user
						payload['sender_uuid'] 		= user.uuid
						payload['sender_username'] 	= user.username
						payload['editable'] 		= false
					}

					// add/update the event to the current array of events
					set(state.pinnedContacts[key].events, payload.event_uuid, payload)

					// break out of the for loop once found
					break
				}
			}
		}
	},

}

function addContactProperties(contact) {
	// console.log(contact)
	contact['active'] = false
	contact['ready'] = false
	contact['listening'] = false
	contact['events'] = {}
	return contact
}

export default {
  state,
  mutations
}

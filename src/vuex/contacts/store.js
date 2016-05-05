import { set } from 'vue'
import store from '../store'
import emojify from 'emojify.js'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import * as helpers from '../../utils/helpers'
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

				// add any emoticons
				contact_events[i].event_text = emojify.replace(contact_events[i].event_text)

				// linkify http text
				contact_events[i].event_text = helpers.linkify(contact_events[i].event_text)

				// add event to contact
				set(
					state.pinnedContacts[state.currentContact].events,
					contact_events[i].uuid,
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
		// no need to do anything if we're already here
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
		helpers.updateTitleText('Stryve App - @' + state.pinnedContacts[state.currentContact].username)

		// fire resize window event 
		helpers.fireWindowResizeEvent()

		// focus on chat message input field
		helpers.focusOnElement('contact_message')
	},

	[types.SET_PINNED_CONTACTS] (state, contacts) {
		if(!helpers.isNullOrUndefined(contacts))
			contacts.forEach(contact => {
				contact = addContactProperties(contact)
				set(state.pinnedContacts, contact.uuid, contact)
			})
	},

	[types.RESET_SEARCH_CONTACTS] (state) {
		set(state, 'searchContacts', {})
		setSearching(store, false)
	},

	[types.SET_SEARCHING] (state, boolean) {
		set(state, 'searching', boolean)
	},

	[types.SEARCH_CONTACTS_SUCCESS] (state, contacts) {
		
		if(!helpers.isNullOrUndefined(contacts))
			contacts.forEach(contact => {
				set(state.searchContacts, contact.uuid, contact)
			})
	},

	[types.SEARCH_CONTACTS_FAILURE] (state, res) {
		// setSearching(store, false)
		// TODO
		console.log(res)
	},

}

function sendChannelMessage(text, contact_uuid, user) {
	window.user_socket.emit('contact-message', {
		contact_uuid:		channel_uuid,
		sender_uuid:		user.uuid,
		sender_username: 	user.username,
		event_text:			text,
		access_token: 		token.get()
	})
}

function addContactProperties(contact) {
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

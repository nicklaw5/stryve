import * as types from '../mutation-types'
import * as token from '../../utils/token'
import { contacts } from 'stryve-api-client'

export const resetContacts = (store) => {
	store.dispatch(types.RESET_CONTACTS)
}

export const pushEventToContact = (store, payload, isPreliminary) => {
	store.dispatch(types.PUSH_EVENT_TO_CONTACT, payload, isPreliminary)
}

export const togglePinnedContact = (store, contact_uuid) => {
	contacts.postPinContact(
		contact_uuid,
		token.get(),
		cb 		=> { store.dispatch(types.PIN_CONTACT_SUCCESS, cb) },
		errorCb => { store.dispatch(types.PIN_CONTACT_FAILURE, errorCb) }
	)
}

export const switchContacts = (store, contact_uuid) => {
	store.dispatch(types.SWITCH_CONTACTS, contact_uuid)
}

export const fetchContactEvents = (store, contact_uuid) => {
	contacts.getContactEvents(
		contact_uuid,
		25,
		token.get(),
		cb 		=> { store.dispatch(types.FETCH_CONTACT_EVENTS_SUCCESS, cb) },
		errorCb => { store.dispatch(types.FETCH_CONTACT_EVENTS_FAILURE, errorCb) }
	)
}

export const sendContactMessage = (store, text) => {
	store.dispatch(types.SEND_CONTACT_MESSAGE, text)
}

export const searchContacts = (store, query) => {
	setSearching(store, true)
	contacts.getSearchContacts(
		query,
		10,
		token.get(),
		cb 		=> { store.dispatch(types.SEARCH_CONTACTS_SUCCESS, cb) },
		errorCb => { store.dispatch(types.SEARCH_CONTACTS_FAILURE, errorCb) }
	)
}

export const setPinnedContacts = (store, contacts) => {
	store.dispatch(types.SET_PINNED_CONTACTS, contacts)
}

export const resetSearchContacts = (store) => {
	store.dispatch(types.RESET_SEARCH_CONTACTS)
}

export const setSearching = (store, boolean) => {
	store.dispatch(types.SET_SEARCHING, boolean)
}
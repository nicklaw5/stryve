import * as types from '../mutation-types'
import * as users from '../../api/users'

export const switchContacts = (store, contact_uuid) => {
	store.dispatch(types.SWITCH_CONTACTS, contact_uuid)
}

export const fetchContactEvents = (store, contact_uuid) => {
	users.getContactEvents(
		contact_uuid,
		cb 		=> { store.dispatch(types.FETCH_CONTACT_EVENTS_SUCCESS, cb) },
		errorCb => { store.dispatch(types.FETCH_CONTACT_EVENTS_FAILURE, res) }
	)
}

export const sendContactMessage = (store, text) => {
	store.dispatch(types.SEND_CONTACT_MESSAGE, text)
}

export const searchContacts = (store, query) => {
	setSearching(store, true)
	users.getSearchUsers(
		query,
		cb 		=> { store.dispatch(types.SEARCH_CONTACTS_SUCCESS, cb) },
		errorCb => { store.dispatch(types.SEARCH_CONTACTS_FAILURE, res) }
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
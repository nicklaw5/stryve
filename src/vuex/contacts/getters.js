import * as helpers from '../../utils/helpers'

export function getPinnedContacts (state) {
	return state.contacts.pinnedContacts
}

export function getContact (state) {
	let contact = getCurrentContact(state)

	return (helpers.isNullOrUndefined(contact))
		? {}
		: state.contacts.pinnedContacts[contact]
}

export function getCurrentContact (state) {
	return state.contacts.currentContact
}

export function getSearchContacts (state) {
	return state.contacts.searchContacts
}

export function getSearching (state) {
	return state.contacts.searching
}

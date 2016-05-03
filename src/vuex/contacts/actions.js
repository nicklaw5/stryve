import * as types from '../mutation-types'
import * as users from '../../api/users'

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
import * as types from '../mutation-types'
import * as users from '../../api/users'

export const searchContacts = (store, query) => {
	users.getSearchUsers(
		query,
		cb 		=> { store.dispatch(types.SEARCH_CONTACTS_SUCCESS, cb) },
		errorCb => { store.dispatch(types.SEARCH_CONTACTS_FAILURE, res) }
	)
}
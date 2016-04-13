import * as types from '../mutation-types'
import * as users from '../../api/users'

export const fetchUser = (store) => {
	users.getUserSelf(
		cb 		=> { store.dispatch(types.FETCH_USER_SUCCESS, cb) },
		errorCb => { store.dispatch(types.FETCH_USER_FAILURE, errorCb) }
	)
}
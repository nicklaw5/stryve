import * as types from '../mutation-types'
import * as users from '../../api/users'
import { setIsAuthenticated, setAuthMessage } from '../auth/actions'

export const fetchUser = (store) => {
	users.getUserSelf(
		cb 		=> { 
			store.dispatch(types.FETCH_USER_SUCCESS, cb)
			setIsAuthenticated(store, true)
		},
		errorCb => {
			store.dispatch(types.FETCH_USER_FAILURE, errorCb)
			setIsAuthenticated(store, false)
			setAuthMessage(store, 'danger', 'Unable to find user.')
		}
	)
}
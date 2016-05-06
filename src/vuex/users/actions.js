import * as users from '../../api/users'
import * as types from '../mutation-types'
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

export const resetUser = (store) => {
	store.dispatch(types.RESET_USER)
}

export const setServerSocketId = (store, socketId) => {
	store.dispatch(types.SET_SERVER_SOCKET_ID, socketId)
}
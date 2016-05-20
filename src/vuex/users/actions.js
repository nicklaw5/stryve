import { users } from 'stryve-api-client'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import { setIsAuthenticated, setAuthMessage, } from '../auth/actions'

export const fetchUser = (store) => {
	users.getUserSelf(
		token.get(),
		cb => { 
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

export const connectToUserSocket = (store) => {
	store.dispatch(types.CONNECT_TO_USER_SOCKET)
}

export const disconnectFromUserSocket = (store) => {
	store.dispatch(types.DISCONNECT_FROM_USER_SOCKET)
}

export const resetUser = (store) => {
	store.dispatch(types.RESET_USER)
}

export const setServerSocketId = (store, socket_id) => {
	store.dispatch(types.SET_SERVER_SOCKET_ID, socket_id)
}

export const setUserSocketId = (store, socket_id) => {
	store.dispatch(types.SET_USER_SOCKET_ID, socket_id)
}

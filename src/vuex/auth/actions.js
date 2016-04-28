import * as types from '../mutation-types'
import * as auth from '../../api/auth'
import { fetchUser } from '../users/actions'

export const setIsAuthenticated = (store, boolean) => {
	store.dispatch(types.SET_IS_AUTHENTICATED, boolean)
}

export const toggleAuthForm = (store, form) => {
	store.dispatch(types.TOOGLE_AUTH_FORM, form)
}

export const setAuthMessage = (store, tone, message) => {
	store.dispatch(types.SET_AUTH_MESSAGE, tone, message)
}

export const attemptUserLogin = (store, payload, tryAccessToken) => {
	auth.postCreateAuthSession(
		payload,
		tryAccessToken,
		cb 	=> { 
			store.dispatch(types.LOGIN_SUCCESS, cb)
			fetchUser(store)
		},
		errorCb	=> { store.dispatch(types.LOGIN_FAILURE, errorCb) }
	)
}

export const attemptUserRegistration = (store, payload) => {
	auth.postCreateRegisteredUser(
		payload, 
		cb => { 
			store.dispatch(types.REGISTRATION_SUCCESS, cb)
			fetchUser(store)
		},
		errorCb => { store.dispatch(types.REGISTRATION_FAILURE, errorCb) }
	)
}

export const attemptUserLogout = (store) => {
	auth.postDestroyAuthSession(
		cb => { store.dispatch(types.LOGOUT_SUCCESS) },
		errorCb => { store.dispatch(types.LOGOUT_FAILURE) }
	)
}


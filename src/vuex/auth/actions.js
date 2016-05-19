import { auth } from 'stryve-api-client'
import * as token from '../../utils/token'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import { resetContacts } from '../contacts/actions'
import { switchChannelsPanel } from '../app/actions'
import {
	fetchUser,
	resetUser,
	disconnectFromUserSocket } from '../users/actions'
import {
	resetActiveServer,
	unsubscribeFromAllChannels,
	disconnectFromServerSocket } from '../servers/actions'

export const setIsAuthenticated = (store, boolean) => {
	store.dispatch(types.SET_IS_AUTHENTICATED, boolean)
}

export const toggleAuthForm = (store, form) => {
	store.dispatch(types.TOOGLE_AUTH_FORM, form)
}

export const setAuthMessage = (store, tone, message) => {
	store.dispatch(types.SET_AUTH_MESSAGE, tone, message)
}

export const attemptUserLogin = (store, payload) => {
	auth.postLogin(
		payload,
		token.get(),
		cb 	=> {
			store.dispatch(types.LOGIN_SUCCESS, cb)
			fetchUser(store)
		},
		errorCb	=> {
			store.dispatch(types.LOGIN_FAILURE, errorCb)
		}
	)
}

export const attemptUserLogout = (store) => {
	auth.postLogout(
		token.get(),
		cb 	=> {
			store.dispatch(types.LOGOUT)
			resetContacts(store)
			unsubscribeFromAllChannels(store)
			resetUser(store)
			disconnectFromUserSocket(store)
			resetActiveServer(store, true)
			disconnectFromServerSocket(store)
			switchChannelsPanel(store, 'contacts')
		}
	)
}

export const attemptUserRegistration = (store, payload) => {
	auth.postRegister(
		payload, 
		cb => {
			store.dispatch(types.REGISTRATION_SUCCESS, cb)
			fetchUser(store)
		},
		errorCb => { store.dispatch(types.REGISTRATION_FAILURE, errorCb) }
	)
}


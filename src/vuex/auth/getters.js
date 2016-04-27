import * as token from '../../utils/token'

export function authForm (state) {
	return state.auth.authForm
}

export function isAuthenticated (state) {
	return state.auth.isAuthenticated
}

export function getAccessToken (state) {
	return token.get()
}

export function authMessage (state) {
	return state.auth.authMessage
}
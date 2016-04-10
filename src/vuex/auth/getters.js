export function authForm (state) {
	return state.auth.authForm
}

export function isAuthenticated (state) {
	return state.auth.isAuthenticated
}

export function getAccessToken (state) {
	return localStorage.access_token
}

export function authMessage (state) {
	return state.auth.authMessage
}

export function user (state) {
	return state.auth.user
}
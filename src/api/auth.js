import * as ajax from '../utils/ajax'

/**
 * Attempts to create an authenticated session with the API server.
 */
export function createAuthSession(payload, cb) {
	ajax.post('auth/login', payload, null, cb, () => {
		cb()
	})
}

/**
 * Attempts to create a new user with the API server.
 */
export function createNewUser(payload, cb) {
	ajax.post('auth/register', payload, null, cb, () => {
		cb()
	})
}

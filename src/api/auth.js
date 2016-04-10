import * as ajax from '../utils/ajax'

/**
 * Create a user authenticated session.
 */
export function postCreateAuthSession(payload, cb) {
	ajax.post('auth/login', payload, null, cb, () => {
		cb()
	})
}

/**
 * Destroy a user authenticated session.
 */
export function postDestroyAuthSession(cb) {
	ajax.post('auth/logout', null, true, cb, () => {
		cb()
	})
}

/**
 * Create a new user.
 */
export function postCreateNewUser(payload, cb) {
	ajax.post('auth/register', payload, null, cb, () => {
		cb()
	})
}

import * as ajax from '../utils/ajax'
import * as codes from '../utils/response-codes'

/**
 * Create a user authenticated session.
 */
export function postCreateAuthSession(payload, tryAccessToken, cb, errorCb) {
	ajax.post('auth/login', payload, tryAccessToken, res => {
		(res.code === codes.CREATED)
			? cb(res.response)
			: errorCb(res.response)
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

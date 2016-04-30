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
 * Create a new user.
 */
export function postCreateRegisteredUser(payload, cb, errorCb) {
	ajax.post('auth/register', payload, null, res => {
		(res.code === codes.CREATED)
			? cb(res.response)
			: errorCb(res.response)
	})
}

/**
 * Destroy a user authenticated session.
 */
export function postDestroyAuthSession(cb) {
	ajax.post('auth/logout', null, true, res => {
		cb(res)
	})
}


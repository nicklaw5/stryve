import * as ajax from '../utils/ajax'

/**
 * Get the authenticated users account info.
 */
export function getUserSelf(cb) {
	ajax.get('users/self', null, true, cb, () => {
		cb()
	})
}
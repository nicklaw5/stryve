import * as ajax from '../utils/ajax'
import * as codes from '../utils/response-codes'

/**
 * Get the authenticated users account info.
 */
export function getUserSelf(cb, errorCb) {
	ajax.get('users/self', null, true, res => {
		(res.code = codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}
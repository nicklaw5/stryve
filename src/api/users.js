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

/**
 * Search for a user by username
 */
export function getSearchUsers(query, cb, errorCb) {
	ajax.get('users?q=' + query, null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}

/**
 * Get the events between the user and the contact
 */
export function getContactEvents(contact_uuid, cb, errorCb) {
	ajax.get('users/events/' + contact_uuid + '?limit=25', null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}
import * as ajax from '../utils/ajax'
import * as codes from '../utils/response-codes'

/**
 * Get recent channel events.
 */
export function fetchChannelEvents(channel_uuid, cb, errorCb) {
	ajax.get('channels/' + channel_uuid + '/events?limit=25', null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}
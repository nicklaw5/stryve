import * as ajax from '../utils/ajax'
import * as codes from '../utils/response-codes'

/**
 * Get the users server list.
 */
export function getServersSelf(cb, errorCb) {
	ajax.get('servers/self', null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}

/**
 * Get the specified server.
 */
export function getServer(server, includeChannels, cb, errorCb) {
	ajax.get('servers/' + server.uuid + ((includeChannels)? '?channels=true' : '' ), null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}
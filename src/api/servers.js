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
export function getServer(server_uuid, includeChannels, cb, errorCb) {
	ajax.get('servers/' + server_uuid + ((includeChannels)? '?channels=true' : '' ), null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}

/**
 * Get a list of available servion regions
 */
export function getServerRegions(cb, errorCb) {
	ajax.get('regions', null, true, res => {
		(res.code === codes.OK)
			? cb(res.response)
			: errorCb(res.response)
	})
}

/**
 * Create a new server
 */
export function postNewServer (payload, cb, errorCb) {
	ajax.post('servers', payload, true, res => {
		(res.code === codes.CREATED)
			? cb(res.response)
			: errorCb(res.response)
	})
}
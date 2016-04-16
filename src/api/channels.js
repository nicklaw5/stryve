import * as ajax from '../utils/ajax'
import * as codes from '../utils/response-codes'

/**
 * Get the channels that belong to the server.
 */
export function getServerChannels(server, cb, errorCb) {
	ajax.get('servers/' + server.uuid + '?channels=true', null, true, res => {
		(res.code === codes.OK)
			? cb(res.response.channels)
			: errorCb(res.response)
	})
}
import * as ajax from '../utils/ajax'

/**
 * Get the users server list.
 */
export function getServersSelf(cb) {
	ajax.get('servers/self', null, true, cb, () => {
		cb()
	})
}

/**
 * Get the channels that belong to the server.
 */
export function getServerChannels(server, cb) {
	ajax.get('servers/' + server.uuid + '?channels=true', null, true, cb, () => {
		cb()
	})
}
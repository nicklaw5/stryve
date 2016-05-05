import * as helpers from '../../utils/helpers'

export function getServers (state) {
	return state.servers.servers
}

export function getCurrentServer (state) {
	return state.servers.currentServer
}

export function getServer (state) {
	return state.servers.servers[getCurrentServer(state)]
}

export function getCurrentChannel (state) {
	return state.servers.currentChannel
}

export function getChannel (state) {
	let server = getCurrentServer(state)
	let channel = getCurrentChannel(state)

	return (helpers.isNullOrUndefined(server)
		|| helpers.isNullOrUndefined(channel))
			 ? {}
			 : state.servers.servers[server].channels[channel]
}

export function getServerRegions (state) {
	return state.servers.serverRegions
}

export function getServerInvitivationToken (state) {
	return state.servers.serverInvitivationToken
}
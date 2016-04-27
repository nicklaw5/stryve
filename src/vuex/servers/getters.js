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

	if(!server || !channel)
		return {}

	return state.servers.servers[server].channels[channel]
}

export function getServerRegions (state) {
	return state.servers.serverRegions
}

export function getNewServerModal (state) {
	return state.servers.newServerModal
}

export function getNewChannelModal (state) {
	return state.servers.newChannelModal
}

export function getServerMenu (state) {
	return state.servers.serverMenu
}

export function getServerInvitivation (state) {
	return state.servers.serverInvitivation
}

export function getServerInvitivationToken (state) {
	return state.servers.serverInvitivationToken
}
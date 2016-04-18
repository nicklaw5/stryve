import * as types from '../mutation-types'
import * as servers from '../../api/servers'
import { switchChannelsPanel } from '../app/actions'

export const switchServers = (store, server) => {
	store.dispatch(types.SWITCH_SERVERS, server)
	switchChannelsPanel(store, 'channels')
	emptyChannelList(store)
	fetchServer(store, server, true)
}

export const resetActiveServer = (store) => {
	store.dispatch(types.RESET_ACTIVE_SERVER)
}

export const emptyChannelList = (store) => {
	store.dispatch(types.EMPTY_CHANNEL_LIST)
}

export const emptyServerList = (store) => {
	store.dispatch(types.RESET_SERVER_LIST)
}

export const fetchServer = (store, server, includeChannels) => {
	servers.getServer(
		server,
		includeChannels,
		cb => {
			store.dispatch(types.FETCH_SERVER_SUCCESS, cb)
			connectToSocketServer(store, cb)
			instantiateServerChannels(store, cb.channels)
		},
		errorCb	=> { store.dispatch(types.FETCH_SERVER_FAILURE, errorCb) }
	)
}

export const fetchServerList = (store) => {
	servers.getServersSelf(
		cb 		=> { store.dispatch(types.FETCH_SERVERS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_SERVERS_FAILURE, errorCb) }
	)
}

export const connectToSocketServer = (store, server) => {
	store.dispatch(types.CONNECT_TO_SOCKET_SERVER, server)
}

export const disconnectFromSocketServer = (store) => {
	store.dispatch(types.DISCONNECT_FROM_SOCKET_SERVER)
}

export const instantiateServerChannels = (store, channels) => {
	store.dispatch(types.INSTANTIATE_CHANNELS, channels)
}
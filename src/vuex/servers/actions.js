import * as types from '../mutation-types'
import * as servers from '../../api/servers'
import * as helpers from '../../utils/helpers'
import * as channels from '../../api/channels'
import { switchChannelsPanel } from '../app/actions'

export const updateMessageText = (store, text) => {
	store.dispatch(types.UPDATE_MESSAGE_TEXT, text)
}

export const sendMessage = (store, text) => {
	if(!text.trim().length)
		return

	store.dispatch(types.SEND_MESSAGE, text)
}

export const pushEventToChannel = (store, payload) => {
	store.dispatch(types.PUSH_EVENT_TO_CHANNEL, payload)
}

export const switchServers = (store, server_uuid) => {
	store.dispatch(types.SWITCH_SERVERS, server_uuid)
	switchChannelsPanel(store, 'channels')
	fetchServer(store, server_uuid, true)
	helpers.fireWindowResizeEvent()
}

export const switchChannels = (store, channel_uuid) => {
	store.dispatch(types.SWITCH_CHANNELS, channel_uuid)
}

export const getChannelEvents = (store, channel_uuid) => {
	channels.fetchChannelEvents(
		channel_uuid,
		cb 		=> { store.dispatch(types.FETCH_CHANNEL_EVENTS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_CHANNEL_EVENTS_FAILURE, errorCb) }
	)
}

export const resetActiveServer = (store) => {
	store.dispatch(types.RESET_ACTIVE_SERVER)
}

export const fetchServer = (store, server_uuid, includeChannels) => {
	servers.getServer(
		server_uuid,
		includeChannels,
		cb => {
			store.dispatch(types.FETCH_SERVER_SUCCESS, cb)
			connectToSocketServer(store, cb)
			instantiateServerChannels(store, server_uuid, cb.channels)
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

export const instantiateServerChannels = (store, server_uuid, channels) => {
	store.dispatch(types.INSTANTIATE_CHANNELS, server_uuid, channels)
}
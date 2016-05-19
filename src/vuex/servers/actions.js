import * as types from '../mutation-types'
import * as token from '../../utils/token'
import * as helpers from '../../utils/helpers'
import { servers, regions, channels } from 'stryve-api-client'
import { switchChannelsPanel, setNoticeMessage } from '../app/actions'

export const joinServer = (store, invite_token) => {
	setNoticeMessage(store, '', '')
	servers.getJoinServer(
		invite_token,
		token.get(),
		cb 		=> { store.dispatch(types.JOIN_SERVER_WITH_INVITE_TOKEN_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.JOIN_SERVER_WITH_INVITE_TOKEN_FAILURE, errorCb) }
	)
}

export const generateServerInvitation = (store, server_uuid) => {
	servers.postCreateServerInvitation(
		server_uuid,
		token.get(),
		cb 		=> { store.dispatch(types.GENERATE_NEW_SERVER_INVITATION_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.GENERATE_NEW_SERVER_INVITATION_FAILURE, errorCb) }
	)
}

export const resetServerInvitivation = (store) => {
	store.dispatch(types.RESET_SERVER_INVITATION_TOKEN)
}

export const createNewServer = (store, payload) => {
	if(!payload.name.length || !payload.region.length) {
		alert('Both a server name and region are required to create a new server.')
		return
	}

	servers.postCreateServer(
		payload,
		token.get(),
		cb 		=> { store.dispatch(types.CREATE_NEW_SERVER_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.CREATE_NEW_SERVER_FAILURE, errorCb) }
	)
}

export const createNewChannel = (store, payload) => {
	if(!payload.name.length) {
		alert('A channel name is required.')
		return
	}

	servers.postCreateServerChannel(
		payload,
		token.get(),
		cb 		=> { store.dispatch(types.CREATE_NEW_CHANNEL_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.CREATE_NEW_CHANNEL_FAILURE, errorCb) }
	)
}

export const fetchServerRegions = (store) => {
	regions.getRegions(
		token.get(),
		cb 		=> { store.dispatch(types.FETCH_SERVER_REGIONS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_SERVER_REGIONS_FAILURE, errorCb) }
	)
}

export const sendMessage = (store, text) => {
	store.dispatch(types.SEND_MESSAGE, text)
}

export const pushEventToChannel = (store, payload, isPreliminary) => {
	store.dispatch(types.PUSH_EVENT_TO_CHANNEL, payload, isPreliminary)
}

export const switchServers = (store, server_uuid) => {
	let existing_server = store._vm.servers.currentServer === server_uuid
	
	store.dispatch(types.SWITCH_SERVERS, server_uuid)
	switchChannelsPanel(store, 'channels')
	helpers.fireWindowResizeEvent()
	
	if(!existing_server)
		fetchServer(store, server_uuid, true)
}

export const switchChannels = (store, channel_uuid) => {
	store.dispatch(types.SWITCH_CHANNELS, channel_uuid)
}

export const getChannelEvents = (store, channel_uuid) => {
	channels.getChannelEvents(
		channel_uuid,
		15,
		token.get(),
		cb 		=> { store.dispatch(types.FETCH_CHANNEL_EVENTS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_CHANNEL_EVENTS_FAILURE, errorCb) }
	)
}

export const resetActiveServer = (store, resetServerList) => {
	store.dispatch(types.RESET_ACTIVE_SERVER, resetServerList)
}

export const fetchServer = (store, server_uuid, includeChannels) => {
	servers.getServer(
		server_uuid,
		includeChannels,
		token.get(),
		cb => {
			store.dispatch(types.FETCH_SERVER_SUCCESS, cb)
			connectToServerSocket(store, cb)
			instantiateServerChannels(store, server_uuid, cb.channels)
		},
		errorCb	=> { store.dispatch(types.FETCH_SERVER_FAILURE, errorCb) }
	)
}

export const fetchServerList = (store) => {
	servers.getServersSelf(
		null,
		token.get(),
		cb 		=> { store.dispatch(types.FETCH_SERVERS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_SERVERS_FAILURE, errorCb) }
	)
}

export const connectToServerSocket = (store, server) => {
	store.dispatch(types.CONNECT_TO_SERVER_SOCKET, server)
}

export const disconnectFromServerSocket = (store) => {
	store.dispatch(types.DISCONNECT_FROM_SERVER_SOCKET)
}

export const instantiateServerChannels = (store, server_uuid, channels) => {
	store.dispatch(types.INSTANTIATE_CHANNELS, server_uuid, channels)
}

export const unsubscribeFromAllChannels = (store) => {
	store.dispatch(types.UNSUBSCRIBE_FROM_ALL_CHANNELS)
}
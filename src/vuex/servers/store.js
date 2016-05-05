import { set } from 'vue'
import store from '../store'
import emojify from 'emojify.js'
import io from 'socket.io-client'
import * as token from '../../utils/token'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import { setUserSocketId } from '../users/actions'
import { setNoticeMessage, hideModal } from '../app/actions'
import { 
	switchServers,
	switchChannels,
	getChannelEvents,
	disconnectToServer,
	pushEventToChannel
} from './actions'

// initial module state
const state = {
	serverInvitivationToken: '',
	currentChannel: null,
	currentServer: null,
	serverRegions: [],
	servers: {}
}

// mutations
const mutations = {

	[types.JOIN_SERVER_WITH_INVITE_TOKEN_SUCCESS] (state, server) {
			server = addServerProperties(server)
			set(state.servers, server.uuid, server)
			hideModal(store, 'newServerModal')
			switchServers(store, server.uuid)
	},	

	[types.JOIN_SERVER_WITH_INVITE_TOKEN_FAILURE] (state, response) {
		setNoticeMessage(store, 'danger', response.errorMessage)
		console.log(response)
	},

	[types.GENERATE_NEW_SERVER_INVITATION_SUCCESS] (store, invitation) {
		set(state, 'serverInvitivationToken', invitation.invitation_token)
	},

	[types.GENERATE_NEW_SERVER_INVITATION_FAILURE] (store, response) {
		// TODO
		console.log(response)
	},

	[types.RESET_SERVER_INVITATION_TOKEN] (state) {
		set(state, 'serverInvitivationToken', '')
	},

	[types.CREATE_NEW_SERVER_SUCCESS] (state, server) {
		server = addServerProperties(server)
		set(state.servers, server.uuid, server)
		hideModal(store, 'newServerModal')
		switchServers(store, server.uuid)
	},

	[types.CREATE_NEW_SERVER_FAILURE] (store, response) {
		// TODO
		console.log(response)
	},

	[types.CREATE_NEW_CHANNEL_SUCCESS] (state, channel) {
		channel = addChannelProperties(channel)
		set(state.servers[state.currentServer].channels, channel.uuid, channel)
		hideModal(store, 'newChannelModal')
		switchChannels(store, channel.uuid)
	},

	[types.CREATE_NEW_CHANNEL_FAILURE] (store, response) {
		// TODO
		console.log(response)
	},

	[types.FETCH_SERVER_REGIONS_SUCCESS] (state, regions) {
		set(state, 'serverRegions', regions)
	},

	[types.FETCH_SERVER_REGIONS_FAILURE] (state, response) {
		// TODO
		console.log(response)
	},
	
	[types.SEND_MESSAGE] (state, text) {
		sendChannelMessage(text, state.currentChannel, store._vm.users.user)
		helpers.updateElementsValue('channel_message', '')
	},

	[types.RESET_ACTIVE_SERVER] (state, resetServerList) {
		// mark all servers as 'inactive'
		for(let key in state.servers) {
			if(state.servers.hasOwnProperty(key)) {
				set(state.servers[key], 'active', false)
			}
		}

		// are we reseting the server list?
		(typeof resetServerList == 'boolean' && resetServerList)
			// empty out the server list
			? set(state, 'servers', {})
			// delete all channel data for this server
			: set(state.servers[state.currentServer], 'channels', {})
		
		// disconnect from current server
		disconnectFromSocketServer()

		// reset curruent channel
		set(state, 'currentChannel', null)

		// reset current server
		set(state, 'currentServer', null)
	},

	[types.INSTANTIATE_CHANNELS] (state, server_uuid, channels) {
		// instantiate chat channels
		if(helpers.isNullOrUndefined(channels)) {
			set(state.servers[server_uuid], 'channels', {})

		} else {
			// add additional attribute to each channel
			channels.forEach(channel => {
				// add additional channel properties
				channel = addChannelProperties(channel)

				// create channels
				set(state.servers[server_uuid].channels, channel.uuid, channel)
			})

			// check that we have channels to subscribe to
			// if(state.channels.length < 1) {
			// 	// there are no channels, lets prompt the user to create one
			// 	// this.showNewChannelModal();
			// } else {
			// 	// TODO:: join last known channel (add as a possible user setting)

			// 	// join the first channel in the list
			// 	// this.switchChatChannels(this.chat_channels[0]);
			// }
		}
	},

	[types.FETCH_SERVER_SUCCESS] (state, server) {
		// add owner to server
		set(state.servers[state.currentServer], 'owned_by', server.owner)
	},

	[types.FETCH_SERVER_FAILURE] (state, response) {
		// TODO
		console.log(response)
	},

	[types.FETCH_SERVERS_SUCCESS] (state, servers) {
		// check we have some servers
		if(helpers.isNullOrUndefined(servers))
			return

		// create the servers
		servers.forEach(server => {
			// add additional server properties
			server = addServerProperties(server)

			// set all the server to the list
			set(state.servers, server.uuid, server)
		})
	},

	[types.FETCH_SERVERS_FAILURE] (state, response) {
		// TODO
		console.log(response)
	},

	[types.SWITCH_SERVERS] (state, server_uuid) {

		// deal with current server connection
		if(!helpers.isNullOrUndefined(state.currentServer)) {
			// don't connect if we're already connected to this server
			if(state.currentServer === server_uuid)
				return

			// unscubscribe from any channels the user is listening on
			for(let key in state.servers[state.currentServer].channels) {
				if(state.servers[state.currentServer].channels.hasOwnProperty(key)) {
					if(state.servers[state.currentServer].channels[key].listening) {
						unsubscribeFromChatChannel(state.servers[state.currentServer].channels[key], store._vm.users.user)
					}
				}
			}

			// delete all channel data for this server
			set(state.servers[state.currentServer], 'channels', {})

			// disconnect from current server
			disconnectFromSocketServer()

			// reset curruent channel
			set(state, 'currentChannel', null)
		}

		// set the 'active' property
		for(let key in state.servers) {
			if(state.servers.hasOwnProperty(key)) {

				let active = server_uuid === state.servers[key].uuid
				
				// set the servers active property
				set(state.servers[key], 'active', active)

				// set the current active server
				if(active)
				   	set(state, 'currentServer', key)
			}
		}
	},

	[types.CONNECT_TO_SOCKET_SERVER] (state, server) {
		connectToSocketServer(server)
	},

	[types.DISCONNECT_FROM_SOCKET_SERVER] (state) {
		disconnectFromSocketServer()
	},

	[types.UNSUBSCRIBE_FROM_ALL_CHANNELS] (state) {

		if(!helpers.isNullOrUndefined(state.currentServer)
				&& state.servers[state.currentServer].hasOwnProperty('channels')) {

			let user = store._vm.users.user;

			// unscubscribe from any channels the user is listening on
			for(let key in state.servers[state.currentServer].channels) {
				if(state.servers[state.currentServer].channels.hasOwnProperty(key)) {
					if(state.servers[state.currentServer].channels[key].listening) {
						unsubscribeFromChatChannel(state.servers[state.currentServer].channels[key], user)
					}
				}
			}

			// delete all channel data for this server
			set(state.servers[state.currentServer], 'channels', {})
		}
	},

	[types.SWITCH_CHANNELS] (state, channel_uuid) {

		// don't switch if we're already on this channel
		if(state.currentChannel === channel_uuid)
			return

		// check that the user is not already listening on this channel
		if(!state.servers[state.currentServer].channels[channel_uuid].listening) {
			// subscribe to and listen on this channel
			subscribeToChannel(state.servers[state.currentServer].channels[channel_uuid], store._vm.users.user)
			listenOnChannel(state, state.servers[state.currentServer].channels[channel_uuid].uuid)
		}

		// loop over the server channels
		for(let key in state.servers[state.currentServer].channels) {
			if(state.servers[state.currentServer].channels.hasOwnProperty(key)) {
				// set active channel
				if(state.servers[state.currentServer].channels[key].uuid === channel_uuid) {
					set(state.servers[state.currentServer].channels[key], 'active', true)
					set(state, 'currentChannel', key)

					// set 'listening' state
					if(!state.servers[state.currentServer].channels[key].listening)
						set(state.servers[state.currentServer].channels[key], 'listening', true)
				} else {
					// set channel 'inactive'
					set(state.servers[state.currentServer].channels[key], 'active', false)
				}
			}
		}

		// get the last few events that ocurred in this channel
		if(!state.servers[state.currentServer].channels[state.currentChannel].ready) {
			getChannelEvents(store, state.servers[state.currentServer].channels[state.currentChannel].uuid)
		}

		// update title with channel name
		helpers.updateTitleText('Stryve App - #' + state.servers[state.currentServer].channels[state.currentChannel].name)

		// focus on chat message input field
		helpers.focusOnElement('channel_message')
	},

	[types.FETCH_CHANNEL_EVENTS_SUCCESS] (state, channel_events) {
		// check we have events to add to the channel
		if(!helpers.isNullOrUndefined(channel_events)) {
			// add the event to the channel
			for(let i = channel_events.length - 1; i > -1; i--) {
				// skip empty texts
				if(channel_events[i].event_text == null)
					continue

				// add any emoticons
				channel_events[i].event_text = emojify.replace(channel_events[i].event_text)

				// linkify http text
				channel_events[i].event_text = helpers.linkify(channel_events[i].event_text)

				// add event to channel
				set(
					state.servers[state.currentServer].channels[state.currentChannel].events,
					channel_events[i].uuid,
					channel_events[i]
				)
			}
		}

		// channel ready to receive new events
		set(state.servers[state.currentServer].channels[state.currentChannel], 'ready', true)

		// fire resize window event 
		helpers.fireWindowResizeEvent()
		
		// focus on chat message input field
		helpers.focusOnElement('channel_message')
	},

	[types.FETCH_CHANNEL_EVENTS_FAILURE] (state, response) {
		// TODO
		console.log(response)
	},

	[types.PUSH_EVENT_TO_CHANNEL] (state, payload, isPreliminary) {
		for(let key in state.servers[state.currentServer].channels) {
			if(state.servers[state.currentServer].channels.hasOwnProperty(key)) {
				if(payload.channel_uuid === state.servers[state.currentServer].channels[key].uuid)  {
					// insert any found emoticons
					payload.event_text = emojify.replace(payload.event_text)

					// linkify http text
					payload.event_text = helpers.linkify(payload.event_text)

					// add temporary event properties for preliminary events
					if(isPreliminary) {
						let user = store._vm.users.user;
						payload['owner_uuid'] 		= user.uuid
						payload['owner_username'] 	= user.username
						payload['editable'] 		= false
					}

					// add the event to the current array of events
					set(state.servers[state.currentServer].channels[key].events, payload.uuid, payload)

					// break out of the for loop once found
					break
				}
			}
		}
	},
}

function addServerProperties(server) {
	server['owned_by'] = ''
	server['active'] = false
	server['channels'] = {}
	return server
}

function addChannelProperties(channel) {
	channel['active'] = false
	channel['ready'] = false
	channel['listening'] = false
	channel['users'] = {}
	channel['events'] = {}
	return channel
}

function listenOnChannel(state, channel_uuid) {
	// ON USER JOINED CHANNEL
	window.server_socket.on('user-subscribed-to::' + channel_uuid, payload => {
		// add event to channel
		pushEventToChannel(store, payload, false)

		// notify the user of new user subscription
		helpers.notification(payload.event_text, {})
	})

	// ON USER LEFT CHANNEL
	window.server_socket.on('user-unsubscribed-from::' + channel_uuid, payload => {
		// add event to channel
		pushEventToChannel(store, payload, false)
	})

	// ON PRELIMINARY MESSAGE RECEIVED TO CHANNEL
	window.server_socket.on('channel-message::' + channel_uuid + '::preliminary', payload => {
		// add event to channel
		pushEventToChannel(store, payload, true)
	})

	// ON MESSAGE RECEIVED TO CHANNEL
	window.server_socket.on('channel-message::' + channel_uuid, payload => {
		// add event to channel
		pushEventToChannel(store, payload, false)
	})
}

function sendChannelMessage(text, channel_uuid, user) {
	window.server_socket.emit('channel-message', {
		channel_uuid: 	channel_uuid,
		owner_uuid:		user.uuid,
		owner_username:	user.username,
		event_text:		text,
		access_token: 	token.get()
	})
}

function subscribeToChannel(channel, user) {
	if(!helpers.isEmptyObject(channel)) {
		window.server_socket.emit("subscribe-to-channel", {
			channel_uuid: 	channel.uuid,
			channel_name: 	channel.name,
			owner_uuid: 	user.uuid,
			owner_username: user.username,
		})
	}
}

function unsubscribeFromChatChannel(channel, user) {
	if(!helpers.isEmptyObject(channel)) {
		window.server_socket.emit("unsubscribe-from-channel", { 
			channel_uuid: 	channel.uuid,
			channel_name: 	channel.name,
			owner_uuid: 	user.uuid,
			owner_username: user.username,
		})
	}
}

function disconnectFromSocketServer() {
	if(!helpers.isEmptyObject(window.server_socket)) {
		window.server_socket.disconnect()
		window.server_socket = {}
	}
}

function connectToSocketServer(server)  {
	// connect to the socket if the user hasn't already
	if(helpers.isEmptyObject(window.server_socket)) {
		window.server_socket = io(server.server_uri, {forceNew: true})

		// ON CONNECTION TO SERVER
		window.server_socket.on('connected', socket_id => {
			// set the users unique socket_id
			setUserSocketId(store, window.server_socket.id)

			// send user and socket data back to server for logging
			submitUserConnectedEvent(state, store._vm.users.user)
		})

		// ON USER CONNECTED EVENT
		window.server_socket.on('user-connected', payload => {
			// TODO
			// console.log(payload)
		})

		// ON USER DISCONNECTED EVENT
		window.server_socket.on('user-disconnected', payload => {
			// TODO
			// console.log(payload)
		})

		// ON ROOMS RESPONSE
		window.server_socket.on('server-channels', payload => {
			console.log(payload)
		})

	// else if, check that the server hasn't changed
	// if it has we need to disconnect first
	// then reconnect to the new uri
	} else if(window.server_socket.io.uri != server.server_uri) {

		console.log('disconnecting from ' + window.server_socket.io.uri)
		disconnectFromSocketServer()

		// reset the socket
		window.server_socket = {}

		// connect to the new server
		console.log('connecting to ' + server.server_uri)
		connectToSocketServer(store, server)

	// else, use current socket connection
	} else {
		// do nothing, we're already connected to the correct server
		console.log('already connected to this server')
	}
}

function submitUserConnectedEvent(state, user) {

	// check we have a server set
	if(helpers.isNullOrUndefined(state.servers[state.currentServer]))
		return

	// send the message to all connected sockets
	window.server_socket.emit('user-connected', {
		server_uuid: 		state.currentServer,
		server_name: 		state.servers[state.currentServer].name,
		owner_uuid:			user.uuid,
		owner_username:		user.username,
		access_token: 		token.get()
	})
}

export default {
  state,
  mutations
}

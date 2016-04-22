import _ from 'lodash'
import store from '../store'
import emojify from 'emojify.js'
import io from 'socket.io-client'
import * as token from '../../utils/token'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import { setUserSocketId } from '../users/actions'
import { switchServers, disconnectToServer, getChannelEvents } from './actions'

// initial module state
const state = {
	channel: {},
	channels: [
	/*
		{
			uuid: string,
			name: string,
			active: bool,
			avatar: string,
			created_at: datetime,
			updated_at: datetime
		}
	*/
	],
	server : {
	
		uuid: 'string',
		name: 'string',
		active: 'bool',
		avatar: 'string',
		created_at: 'datetime',
		updated_at: 'datetime'
	
	},
	servers: [
	/*
		{
			uuid: string,
			name: string,
			active: bool,
			avatar: string,
			created_at: datetime,
			updated_at: datetime	
		},
		...
	*/
	]
}

// mutations
const mutations = {
	
	[types.RESET_ACTIVE_SERVER] (state) {
		state.server = {}
		for(var i = 0; i < state.servers.length; i++)
			state.servers[i].active = false;
	},

	[types.EMPTY_CHANNEL_LIST] (state) {
		state.channels = []
	},

	[types.EMPTY_SERVER_LIST] (state) {
		state.servers = []
	},

	[types.INSTANTIATE_CHANNELS] (state, channels) {
		// instantiate chat channels
		if(typeof channels != 'undefined') {

			// add additional attribute to each channel
			for(var i = 0; i < channels.length; i++) {
				channels[i]['active'] = false;
				channels[i]['ready'] = false;
				channels[i]['listening'] = false;
				channels[i]['users'] = [];
				channels[i]['events'] = [];
			}

			// set the available channels in this server
			state.channels = channels;

			// check that we have channels to subscribe to
			if(state.channels.length < 1) {
				// there are no channels, lets prompt the user to create one
				// this.showNewChannelModal();
			} else {
				// TODO:: join last known channel (add as a possible user setting)

				// join the first channel in the list
				// this.switchChatChannels(this.chat_channels[0]);
			}

		} else {
			state.channels = [];
		}
	},

	[types.FETCH_SERVER_SUCCESS] (state, response) {
		// TODO
		// console.log(response)
	},

	[types.FETCH_SERVER_FAILURE] (state, response) {
		// TODO
		console.log(response)
	},

	[types.FETCH_SERVERS_SUCCESS] (state, response) {
		// state.servers = response
		var servers = response

		// add 'active' attribute = false
		for(var i = 0; i < servers.length; i++)
			servers[i]['active'] = false;

		state.servers = servers
	},

	[types.FETCH_SERVERS_FAILURE] (state, response) {
		// TODO
		console.log(response)
	},

	[types.SWITCH_SERVERS] (state, server) {
		// deal with current server connection
		if(!helpers.isEmptyObject(server)) {
			// don't connect we're already connected to this server
			if(state.server.uuid === server.uuid)
				return;

			// TODO
			// unscubscribe from any channels the user is listening on
			for(var i = 0; i < state.channels.length; i++)
				if(state.channels[i].listening)
					unsubscribeFromChatChannel(state.channels[i], store._vm.users.user)

			// reset chat channels
			state.channel = {};
			state.channels = [];

			// disconnect from current server
			disconnectFromSocketServer()
		}

		// find and set the active server
		let index = _.findIndex(state.servers, ['active', true])
		if(index  !== -1)
			state.servers[index].active = false

		index = _.findIndex(state.servers, ['uuid', server.uuid])
		state.servers[index].active = true
		state.server = state.servers[index]
	},

	[types.CONNECT_TO_SOCKET_SERVER] (state, server) {
		connectToSocketServer(server)
	},

	[types.DISCONNECT_FROM_SOCKET_SERVER] (state) {
		disconnectFromSocketServer()
	},

	[types.SWITCH_CHANNELS] (state, channel) {

		// don't switch if we're already in this channel
		if(channel.uuid === state.channel.uuid)
			return

		// check that the user is not already listening on this channel
		if(!channel.listening) {
			// subscribe to and listen on this channel
			subscribeToChannel(channel, store._vm.users.user)
			listenOnChannel(channel)
		}

		for(var i = 0; i < state.channels.length; i++) {
			state.channels[i].active = false
			
			// set active channel
			if(state.channels[i].uuid === channel.uuid) {
				state.channels[i].active = true
				state.channel = state.channels[i]

				if(!channel.listening)
					state.channel.listening = true
			}
		}

		// get the last few events that ocurred in this channel
		if(!state.channel.ready) {
			getChannelEvents(store, state.channel)
		} else {
			// scroll the message container to the bottom
			helpers.letScrollTopEquateToScrollHeight('messages-container')

			// focus on chat message input field
			helpers.focusOnElement('chat_message')
		}

		// update title with channel name
		helpers.updateTitleText('Stryve App - #' + state.channel.name)
	},

	[types.FETCH_CHANNEL_EVENTS_SUCCESS] (state, channel_events) {
		// check we have event to work with
		if(typeof channel_events == 'undefined')
			return
			
		// add the event to the channel
		for(var i = channel_events.length - 1; i > -1; i--) {
			if(channel_events[i].event_text == null)
				continue

			// add any emoticons
			channel_events[i].event_text = emojify.replace(channel_events[i].event_text)

			// linkify http text
			channel_events[i].event_text = helpers.linkify(channel_events[i].event_text)

			// add event to channel
			state.channel.events.push(channel_events[i])
		}
		
		// scroll the message container to the bottom
		helpers.letScrollTopEquateToScrollHeight('messages-container')

		// focus on chat message input field
		helpers.focusOnElement('chat_message')

		// channel ready to receive new events
		state.channel.ready = true
	},

	[types.FETCH_CHANNEL_EVENTS_FAILURE] (state, response) {
		// TODO
		console.log(response)
	}

}

function listenOnChannel(channel) {
	// ON USER JOINED CHANNEL
	window.socket.on('user-subscribed-to::' + channel.uuid, function(payload) {
		// add event to channel
		pushEventToChannel(payload)

		// notify the user of new user subscription
		helpers.notification(payload.event_text, {})
		// this.notify(payload.event_text, {})
	})

	// ON USER LEFT CHANNEL
	window.socket.on('user-unsubscribed-from::' + channel.uuid, function(payload) {
		// add event to channel
		pushEventToChannel(payload)
	})

	// ON MESSAGE RECEIVED TO CHANNEL
	window.socket.on('channel-message::' + channel.uuid, function(payload) {
		// add event to channel
		pushEventToChannel(payload)

		// push down the events container
		helpers.letScrollTopEquateToScrollHeight('messages-container')
	})
}

function subscribeToChannel(channel, user) {
	if(!helpers.isEmptyObject(channel)) {
		window.socket.emit("subscribe-to-channel", {
			channel_uuid: 	channel.uuid,
			channel_name: 	channel.name,
			owner_uuid: 	user.uuid,
			owner_username: user.username,
		});
	}
}

function unsubscribeFromChatChannel(channel, user) {
	if(!helpers.isEmptyObject(channel)) {
		window.socket.emit("unsubscribe-from-channel", { 
			channel_uuid: 	channel.uuid,
			channel_name: 	channel.name,
			owner_uuid: 	user.uuid,
			owner_username: user.username,
		});
	}
}

function pushEventToChannel(payload) {
	// look for the channel the event belongs to
	for(var i = 0; i < state.channels.length; i++) {
		if(payload.channel_uuid === state.channels[i].uuid) {

			// insert any found emoticons
			payload.event_text = emojify.replace(payload.event_text)

			// add the event to the current array of events
			state.channels[i].events.push(payload)

			// break out of the for loop once found
			break;
		}
	}
}

function disconnectFromSocketServer() {
	if(!helpers.isEmptyObject(window.socket)) {
		window.socket.disconnect();
		window.socket = {};
	}
}

function connectToSocketServer(server)  {
	// connect to the socket if the user hasn't already
	if(helpers.isEmptyObject(window.socket)) {
		window.socket = io(server.server_uri)

		// ON CONNECTION TO SERVER
		window.socket.on('connected', socket_id => {
			// set the users unique socket_id
			setUserSocketId(store, window.socket.id)

			// send user and socket data back to server for logging
			submitUserConnectedEvent(store._vm.users.user);
		})

		// ON USER CONNECTED EVENT
		window.socket.on('user-connected', function(payload) {
			console.log(payload)
		})

		// ON USER DISCONNECTED EVENT
		// TODO
		// window.socket.on('user-disconnected', function(payload) {
		// 	console.log(payload);
		// });

		// ON ROOMS RESPONSE
		window.socket.on('server-channels', function(payload) {
			console.log(payload)
		})

	// else if, check that the server hasn't changed
	// if it has we need to disconnect first
	// then reconnect to the new uri
	} else if(window.socket.io.uri != server.server_uri) {

		console.log('disconnecting from ' + window.socket.io.uri);
		disconnectFromSocketServer();

		// reset the socket
		window.socket = {};

		// connect to the new server
		console.log('connecting to ' + server.server_uri);
		connectToSocketServer(store, server)

	// else, use current socket connection
	} else {
		// do nothing, we're already connected to the correct server
		console.log('already connected to this server')
	}
}

function submitUserConnectedEvent(user) {
	window.socket.emit('user-connected', {
		server_uuid: 		state.server.uuid,
		server_name: 		state.server.name,
		owner_uuid:			user.uuid,
		owner_username:		user.username,
		access_token: 		token.get()
	})
}

export default {
  state,
  mutations
}


import _ from 'lodash'
import store from '../store'
import io from 'socket.io-client'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import { switchServers, disconnectToServer } from './actions'
import { setUserSocketId } from '../users/actions'

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

			// unscubscribe from any channels the user is listening on
			// for(var i = 0; i < this.chat_channels.length; i++)
			// 	if(this.chat_channels[i].listening)
			// 		this.unsubscribeFromChatChannel(this.chat_channels[i])

			// reset chat channels
			// this.chat_channel = {};
			// this.chat_channels = {};

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

		// // prepare request for channels
		// this.setRequestOptions('get', 'servers/' + server.uuid + '?channels=true', null, true);

		// // submit request
		// request(this.getRequestOptions(), function (error, response, body) {
		// 	// parse the response
		// 	body =  JSON.parse(body);

		// 	// handle success
		// 	if (body.code == 200) {

				// // connect to the server
				// this.connectToChatServer(body.response);

				// // prepare chat channels
				// this.instantiateChatChannels(body.response.channels);

		// 	} else {
		// 		// handle error
		// 		handleFailedRequest(body);
		// 	}
		// });
	},

	[types.CONNECT_TO_SOCKET_SERVER] (state, server) {	
		// console.log(window.socket)	
		// if(typeof window.socket == 'undefined')
			// window.socket = {}

		// connect to the socket if the user hasn't already
		if(helpers.isEmptyObject(window.socket)) {
			window.socket = io(server.server_uri)

			// ON CONNECTION TO SERVER
			window.socket.on('connected', socket_id => {
				// set the users unique socket_id
				setUserSocketId(store, window.socket.id)

				// send user and socket data back to server for logging
				// TODO
				// this.submitUserConnectedEvent();
			})
		

			// ON USER CONNECTED EVENT
			window.socket.on('user-connected', function(payload) {
				console.log(payload)
			})

			// ON USER DISCONNECTED EVENT
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
			// this.connectToChatServer(server);
			// switchServers(store, server)

		// else, use current socket connection
		} else {
			// do nothing, we're already connected to the correct server
			console.log('already connected to this server')
		}
	},

	[types.DISCONNECT_FROM_SOCKET_SERVER] (state) {
		disconnectFromSocketServer()
	}
}

function disconnectFromSocketServer() {
	if(!helpers.isEmptyObject(window.socket)) {
		window.socket.disconnect();
		window.socket = {};
	}
}

export default {
  state,
  mutations
}
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import _ from 'lodash'

// initial module state
const state = {
	server : {
	/*
		uuid: string,
		name: string,
		active: bool,
		avatar: string,
		created_at: datetime,
		updated_at: datetime
	*/
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

	[types.EMPTY_SERVER_LIST] (state) {
		state.servers = []
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
			// this.disconnectFromChatServer();
		}

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

		// 		// connect to the server
		// 		this.connectToChatServer(body.response);

		// 		// prepare chat channels
		// 		this.instantiateChatChannels(body.response.channels);

		// 	} else {
		// 		// handle error
		// 		handleFailedRequest(body);
		// 	}
		// }.bind(this));
	},
}

export default {
  state,
  mutations
}

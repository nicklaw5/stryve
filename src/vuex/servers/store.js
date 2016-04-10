import { 
	SWITCH_SERVERS,
	RESET_SERVER_LIST,
	EMPTY_SERVER_CHANNELS,
	RETRIEVE_SERVERS_LIST,
	RETRIEVE_SERVER_CHANNELS
} from '../mutation-types'
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
	],
	serverChannel: {
	/*
	
	*/
	},
	serverChannels: [
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
	]
}

// mutations
const mutations = {
	
	[RESET_SERVER_LIST] (state) {
		for(var i = 0; i < state.servers.length; i++)
			state.servers[i].active = false;
	},

	[EMPTY_SERVER_CHANNELS] (state) {
		state.serverChannels = {}
	},

	[RETRIEVE_SERVERS_LIST] (state, response) {
		// state.servers = response
		var servers = response

		// add 'active' attribute = false
		for(var i = 0; i < servers.length; i++)
			servers[i]['active'] = false;

		state.servers = servers
	},

	[SWITCH_SERVERS] (state, server) {
		var index = null

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

		index = _.findIndex(state.servers, ['active', true])
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

	[RETRIEVE_SERVER_CHANNELS] (state, channels) {

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
			state.serverChannels = channels;

			// check that we have channels to subscribe to
			if(state.serverChannels.length < 1) {
				// there are no channels, lets prompt the user to create one
				// this.showNewChannelModal();
			} else {
				// TODO:: join last known channel (add as a possible user setting)

				// join the first channel in the list
				// this.switchChatChannels(this.chat_channels[0]);
			}

		} else {
			state.serverChannels = [];
		}
	}
}

export default {
  state,
  mutations
}

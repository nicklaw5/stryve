import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import _ from 'lodash'

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
	]
}

// mutations
const mutations = {

	[types.EMPTY_CHANNEL_LIST] (state) {
		state.channels = []
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
	}

}

export default {
  state,
  mutations
}

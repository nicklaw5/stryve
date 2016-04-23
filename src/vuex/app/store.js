import { set } from 'vue'
import * as types from '../mutation-types'

// initial module state
const state = {
	channelsPanel: 'contacts' // 'contacts' or 'channels'
}

// mutations
const mutations = {
	
	[types.SWITCH_CHANNELS_PANEL] (state, panel) {
		set(state, 'channelsPanel', panel)
	}
}

export default {
  state,
  mutations
}

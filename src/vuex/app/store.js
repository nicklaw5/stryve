import { set } from 'vue'
import * as types from '../mutation-types'

// initial module state
const state = {
	noticeMessage: { tone: '', message: '' }, // tone can be 'danger' or 'success'
	channelsPanel: 'contacts' // 'contacts' or 'channels'
}

// mutations
const mutations = {

	[types.SET_NOTICE_MESSAGE] (state, tone, message) {
		set(state, 'noticeMessage', { tone: tone, message: message })
	},
	
	[types.SWITCH_CHANNELS_PANEL] (state, panel) {
		set(state, 'channelsPanel', panel)
	}
}

export default {
  state,
  mutations
}

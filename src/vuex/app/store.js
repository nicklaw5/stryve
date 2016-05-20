import { set } from 'vue'
import store from '../store'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import { toggleServerMenu } from './actions'

// initial module state
const state = {
	noticeMessage: { tone: '', message: '' }, // tone can be 'danger' or 'success'
	channelsPanel: 'contacts', // 'contacts' or 'channels'
	serverMenu: false,
	newServerModal: false,
	newChannelModal: false,
	serverInvitivationModal: false
}

// mutations
const mutations = {

	[types.SET_NOTICE_MESSAGE] (state, tone, message) {
		set(state, 'noticeMessage', { tone: tone, message: message })
	},
	
	[types.SWITCH_CHANNELS_PANEL] (state, panel) {
		set(state, 'channelsPanel', panel)
		
		// fire resize window event 
		helpers.fireWindowResizeEvent()
	},

	[types.SHOW_MODAL] (state, modal) {
		helpers.showModalOverlay()
		set(state, modal, true)
		toggleServerMenu(store, false)
	},

	[types.HIDE_MODAL] (state, modal) {
		helpers.hideModalOverlay()
		set(state, modal, false)
	},

	[types.TOGGLE_SERVER_MENU] (state, forceState) {
		set(state, 'serverMenu', 
			(!helpers.isNullOrUndefined(forceState))
			? forceState
			: !state.serverMenu
		)
	},
}

export default {
  state,
  mutations
}

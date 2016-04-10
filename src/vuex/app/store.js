import {
	SET_SHOW_CONTACTS_PANEL
} from '../mutation-types'

// initial module state
const state = {
	showContactsPanel: true
}

// mutations
const mutations = {
	
	[SET_SHOW_CONTACTS_PANEL] (state, boolean) {
		state.showContactsPanel = boolean
	},
}

export default {
  state,
  mutations
}

import * as types from '../mutation-types'

// initial module state
const state = {
	showContactsPanel: true
}

// mutations
const mutations = {
	
	[types.SHOW_CONTACTS_PANEL] (state, boolean) {
		state.showContactsPanel = boolean
	}
}

export default {
  state,
  mutations
}

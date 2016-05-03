import { set } from 'vue'
import store from '../store'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import { setPinnedContacts } from '../contacts/actions'

// initial module state
const state = {
	user: {}
}

// mutations
const mutations = {
	
	[types.FETCH_USER_SUCCESS] (state, response) {
		set(state, 'user', response)
		setPinnedContacts(store, response.contacts)
		delete state.user.contacts;
	},

	[types.FETCH_USER_FAILURE] (state, response) {
		console.log(response)
	},

	[types.RESET_USER] (state) {
		set(state, 'user', {})
	},

	[types.SET_USER_SOCKET_ID] (state, socket_id) {
		set(state.user, 'socket_id', socket_id);
	}
}

export default {
  state,
  mutations
}

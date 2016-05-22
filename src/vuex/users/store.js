import { set } from 'vue'
import store from '../store'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import * as userSocket from '../../utils/user-socket'
import { setPinnedContacts } from '../contacts/actions'
import { connectToUserSocket } from '../users/actions'

// initial module state
const state = {
	user: {}
}

// mutations
const mutations = {
	
	[types.FETCH_USER_SUCCESS] (state, response) {
		const contacts = response.contacts
		delete response.contacts
		set(state, 'user', response)
		localStorage.userEmail = state.user.email
		setPinnedContacts(store, contacts)
		connectToUserSocket(store)
	},

	[types.FETCH_USER_FAILURE] (state, response) {
		console.log(response)
	},

	[types.RESET_USER] (state) {
		set(state, 'user', {})
	},

	[types.CONNECT_TO_USER_SOCKET] (state) {
		userSocket.connectToUserSockect(store._vm.users.user.uuid)
	},

	[types.DISCONNECT_FROM_USER_SOCKET] (state) {
		userSocket.disconnectFromUserSocket()
	},

	[types.SET_SERVER_SOCKET_ID] (state, socket_id) {
		set(state.user, 'server_socket_id', socket_id);
	},

	[types.SET_USER_SOCKET_ID] (state, socket_id) {
		set(state.user, 'user_socket_id', socket_id);
	}
}

export default {
  state,
  mutations
}

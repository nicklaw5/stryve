import { set } from 'vue'
import store from '../store'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import * as user_socket from '../../user_socket'
import { setPinnedContacts } from '../contacts/actions'
import { connectToUserSocket } from '../users/actions'

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
		connectToUserSocket(store)
	},

	[types.FETCH_USER_FAILURE] (state, response) {
		console.log(response)
	},

	[types.RESET_USER] (state) {
		set(state, 'user', {})
	},

	[types.CONNECT_TO_USER_SOCKET] (state) {
		user_socket.connectToUserSockect(store._vm.users.user.uuid)
	},

	[types.SET_SERVER_SOCKET_ID] (state, socket_id) {
		set(state.user, 'server_socket_id', socket_id);
	},

	[types.SET_USER_SOCKET_ID] (state, socket_id) {
		set(state.user, 'user_socket_id', socket_id);
	}
}

function listenOnUserSocket(state, user_uuid) {

	// ON PRELIMINARY MESSAGE RECEIVED BY CONTACT
	window.user_socket.on('contact-message::' + user_uuid + '::preliminary', payload => {
		// add event to contact
		// pushEventToChannel(store, payload, true)
	})

	// ON MESSAGE RECEIVED TO CHANNEL
	window.user_socket.on('contact-message::' + user_uuid, payload => {
		// add event to contact
		// pushEventToChannel(store, payload, false)
	})
}


export default {
  state,
  mutations
}

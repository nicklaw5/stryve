import * as types from '../mutation-types'
import * as token from '../../utils/token'

// initial module state
const state = {
	user: {}
}

// mutations
const mutations = {
	
	[types.FETCH_USER_SUCCESS] (state, response) {
		state.user = response
	},

	[types.FETCH_USER_FAILURE] (state, response) {
		console.log(response)
	},

	[types.SET_USER_SOCKET_ID] (state, socket_id) {
		state.user['socket_id'] = state.socket.id;
		console.log(user)
		// if(typeof state.user.socket_id == 'undefined'){
		// 	state.user['socket_id'] = state.socket.id;
		// } else {
		// 	state.user.socket_id = socket_id;
		// }
	}
}

export default {
  state,
  mutations
}

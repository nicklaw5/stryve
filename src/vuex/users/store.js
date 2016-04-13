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
	}
}

export default {
  state,
  mutations
}

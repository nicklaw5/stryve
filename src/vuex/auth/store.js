import { 
	LOGIN_USER,
	TOGGLE_IS_REGISTERING
	} from '../mutation-types'

// initial state
const state = {
	isAuthenticated: false,
	isRegistering: false
}

// mutations
const mutations = {
	
	[LOGIN_USER] (state, response) {
		console.log(response)
  	},

	[TOGGLE_IS_REGISTERING] (state) {
		state.isRegistering = !state.isRegistering
	}
}

export default {
  state,
  mutations
}
import { 
	LOGIN_USER,
	REGISTER_USER,
	SET_ACCESS_TOKEN,
	TOOGLE_AUTH_FORM,
	TOGGLE_IS_AUTHENTICATED
} from '../mutation-types'

// initial state
const state = {
	authForm: 'login', // 'login' or 'register'
	isAuthenticated: false
}

// mutations
const mutations = {
	
	[LOGIN_USER] (state, response) {

  	},

  	[REGISTER_USER] (state, response) {
		console.log(response)
  	},

  	[SET_ACCESS_TOKEN] (state, access_token) {
  		localStorage.access_token = access_token
  	},

	[TOOGLE_AUTH_FORM] (state, form) {
		state.authForm = form
	},
	
	[TOGGLE_IS_AUTHENTICATED] (state) {
		state.isAuthenticated = !state.isAuthenticated
	}
}

export default {
  state,
  mutations
}

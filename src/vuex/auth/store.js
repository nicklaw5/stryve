import {
	SET_USER,
	LOGOUT_USER,
	SET_AUTH_MESSAGE,
	TOOGLE_AUTH_FORM,
	AUTHENTICATE_USER,
	DESTROY_ACCESS_TOKEN
} from '../mutation-types'

// initial module state
const state = {
	user: {},
	authForm: 'login', // 'login' or 'register'
	isAuthenticated: false,
	authMessage: { tone: '', message: '' } // tone can be 'danger' or 'success'
}

// mutations
const mutations = {
	
	[SET_USER] (state, response) {
		setIsAuthenticated(true)
		setAuthMessage('', '')
		state.user = response
	},

	[SET_AUTH_MESSAGE] (state, tone, message) {
		setAuthMessage(tone, message);
	},

	[AUTHENTICATE_USER] (state, response) {
			setIsAuthenticated(true)
			setAuthMessage('', '')
			localStorage.access_token = response.token
	},

	[LOGOUT_USER] (state) {
		delete localStorage.access_token
		setIsAuthenticated(false)
	},

	[TOOGLE_AUTH_FORM] (state, form) {
		state.authForm = form
	},

	[DESTROY_ACCESS_TOKEN] (state) {
		delete localStorage.access_token
	}
}

function setIsAuthenticated(boolean) {
	state.isAuthenticated = boolean
}

function setAuthMessage(tone, message) {
	state.authMessage = {
		tone: tone,
		message: message
	}
}

export default {
  state,
  mutations
}


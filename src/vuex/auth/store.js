import * as types from '../mutation-types'
import * as token from '../../utils/token'

// initial module state
const state = {
	user: {},
	authForm: 'login', // 'login' or 'register'
	isAuthenticated: false,
	authMessage: { tone: '', message: '' } // tone can be 'danger' or 'success'
}

// mutations
const mutations = {
	
	[types.LOGIN_SUCCESS] (state, access_token) {
		setAuthMessage('', '')
		setIsAuthenticated(true)
		token.set(access_token)
	},

	[types.LOGIN_FAILURE] (state, error) {
		setAuthMessage('danger', error)
	},

	[types.SET_USER] (state, response) {
		setIsAuthenticated(true)
		setAuthMessage('', '')
		state.user = response
	},

	[types.SET_AUTH_MESSAGE] (state, tone, message) {
		setAuthMessage(tone, message);
	},

	[types.AUTHENTICATE_USER] (state, response) {
			setIsAuthenticated(true)
			setAuthMessage('', '')
			localStorage.access_token = response.token
	},

	[types.LOGOUT_USER] (state) {
		delete localStorage.access_token
		setIsAuthenticated(false)
	},

	[types.TOOGLE_AUTH_FORM] (state, form) {
		state.authForm = form
	},

	[types.DESTROY_ACCESS_TOKEN] (state) {
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


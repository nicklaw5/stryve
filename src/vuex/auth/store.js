import * as types from '../mutation-types'
import * as token from '../../utils/token'

// initial module state
const state = {
	authForm: 'login', // 'login' or 'register'
	isAuthenticated: false,
	authMessage: { tone: '', message: '' } // tone can be 'danger' or 'success'
}

// mutations
const mutations = {
	
	[types.LOGIN_SUCCESS] (state, response) {
		loginOrRegistrationSuccess(response)
	},

	[types.LOGIN_FAILURE] (state, response) {
		token.destroy()
		setAuthMessage('danger', response.errorMessage)
	},

	[types.LOGOUT_SUCCESS] (state, response) {
		logoutSuccessOrFailure()
	},

	[types.LOGOUT_FAILURE] (state, response) {
		logoutSuccessOrFailure()
	},

	[types.REGISTRATION_SUCCESS] (state, response) {
		loginOrRegistrationSuccess(response)
	},
	
	[types.REGISTRATION_FAILURE] (state, response) {
		setAuthMessage('danger', response.errorMessage)
	},

	[types.SET_AUTH_MESSAGE] (state, tone, message) {
		setAuthMessage(tone, message)
	},

	[types.TOOGLE_AUTH_FORM] (state, form) {
		state.authForm = form
	}
}

function logoutSuccessOrFailure() {
	token.destroy()
	setIsAuthenticated(false)
	setAuthMessage('success', 'Successfully logged out.')
}

function loginOrRegistrationSuccess(response) {
	setAuthMessage('', '')
	setIsAuthenticated(true)
	token.set(response.token)
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


import store from '../store'
import io from 'socket.io-client'
import * as types from '../mutation-types'
import * as token from '../../utils/token'
import * as helpers from '../../utils/helpers'

// initial module state
const state = {
	authForm: 'login', // 'login' or 'register'
	isAuthenticated: false,
	authMessage: { tone: '', message: '' } // tone can be 'danger' or 'success'
}

// mutations
const mutations = {

	[types.LOGIN_SUCCESS] (state, res) {
		loginOrRegistrationSuccess(res)
	},

	[types.LOGIN_FAILURE] (state, res) {
		token.destroy()
		setAuthMessage('danger', res.errorMessage)
	},

	[types.LOGOUT] (state) {
		token.destroy()
		setAuthForm('login')
		setIsAuthenticated(false)
		localStorage.automaticLogin = false
		setAuthMessage('success', 'Successfully logged out.')
	},

	[types.REGISTRATION_SUCCESS] (state, res) {
		loginOrRegistrationSuccess(res)
	},
	
	[types.REGISTRATION_FAILURE] (state, res) {
		setAuthMessage('danger', res.errorMessage)
	},

	[types.SET_AUTH_MESSAGE] (state, tone, message) {
		setAuthMessage(tone, message)
	},

	[types.TOOGLE_AUTH_FORM] (state, form) {
		setAuthForm(form)
	},

	[types.SET_IS_AUTHENTICATED] (state, boolean) {
		state.isAuthenticated = boolean
	}
}

function setAuthForm(form) {
	state.authForm = form
}

function loginOrRegistrationSuccess(res) {
	token.set(res.token)
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


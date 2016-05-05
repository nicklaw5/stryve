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
	
	[types.CONNECT_USER_SOCKET] (state) {
		connectToUserSockect(store._vm.users.user.uuid)
	},

	[types.LOGIN_SUCCESS] (state, response) {
		loginOrRegistrationSuccess(response)
	},

	[types.LOGIN_FAILURE] (state, response) {
		token.destroy()
		setAuthMessage('danger', response.errorMessage)
	},

	[types.LOGOUT] (state) {
		token.destroy()
		setAuthForm('login')
		setIsAuthenticated(false)
		localStorage.automaticLogin = false
		setAuthMessage('success', 'Successfully logged out.')
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
		setAuthForm(form)
	},

	[types.SET_IS_AUTHENTICATED] (state, boolean) {
		state.isAuthenticated = boolean
	}
}

function setAuthForm(form) {
	state.authForm = form
}

function loginOrRegistrationSuccess(response) {
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

function connectToUserSockect(user_uuid)  {
	// connect to the socket if the user hasn't already
	if(helpers.isEmptyObject(window.user_socket)) {
		window.user_socket = io('http://stryve.io:3000', {forceNew: true})

		// // ON CONNECTION TO SERVER
		// window.user_socket.on('connected', socket_id => {
		// 	// set the users unique socket_id
		// 	setUserSocketId(store, window.user_socket.id)

		// 	// send user and socket data back to server for logging
		// 	submitUserConnectedEvent(state, store._vm.users.user)
		// })

		// // ON USER CONNECTED EVENT
		// window.user_socket.on('user-connected', payload => {
		// 	// TODO
		// 	// console.log(payload)
		// })

		// // ON USER DISCONNECTED EVENT
		// window.user_socket.on('user-disconnected', payload => {
		// 	// TODO
		// 	// console.log(payload)
		// })
	}
}

export default {
  state,
  mutations
}


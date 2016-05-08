import store from './vuex/store'
import io from 'socket.io-client'
import * as token from './utils/token'
import * as helpers from './utils/helpers'
import { setUserSocketId } from './vuex/users/actions'

export const connectToUserSockect = user_uuid =>  {
	// connect to the socket if the user hasn't already
	if(helpers.isEmptyObject(window.user_socket)) {
		window.user_socket = io('http://stryve.io:3000/users', {forceNew: true})

		// ON CONNECTION TO SERVER
		window.user_socket.on('connected', socket_id => {
			// set the users unique socket_id
			setUserSocketId(store, window.user_socket.id)

			// send user and socket data back to server for logging
			// submitUserConnectedEvent(state, store._vm.users.user)
		})
	}
}

export const sendContactMessage = (text, contact_uuid, user) => {
	window.user_socket.emit('contact-message', {
		recipient_uuid:		contact_uuid,
		sender_uuid:		user.uuid,
		sender_username: 	user.username,
		event_text:			text,
		access_token: 		token.get()
	})
}
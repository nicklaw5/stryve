import store from '../vuex/store'
import io from 'socket.io-client'
import * as token from './token'
import * as helpers from './helpers'
import * as config from '../config'
import { setUserSocketId } from '../vuex/users/actions'
import { pushEventToContact } from '../vuex/contacts/actions'

export const connectToUserSockect = user_uuid =>  {
  // connect to the socket if the user hasn't already
  if(helpers.isEmptyObject(window.userSocket)) {
    window.userSocket = io(config.default_socket_url + ':' + config.default_socket_port + '/users', {forceNew: true})

    // ON CONNECTION TO SERVER
    window.userSocket.on('connected', socket_id => {
      // set the users unique socket_id
      setUserSocketId(store, window.userSocket.id)

      // send user and socket data back to server for logging
      // submitUserConnectedEvent(state, store._vm.users.user)
    })

    // ON PRELIMINARY MESSAGE RECEIVED TO CONTACT
    window.userSocket.on('contact-message::' + user_uuid + '::preliminary', payload => {
      // add event to contact
      pushEventToContact(store, payload, true)
    })

    // ON MESSAGE RECEIVED TO CONTACT
    window.userSocket.on('contact-message::' + user_uuid, payload => {
      // add event to contact
      pushEventToContact(store, payload, false)
    })
  }
}

export const disconnectFromUserSocket = () => {
  if(!helpers.isEmptyObject(window.userSocket)) {
    window.userSocket.disconnect()
    window.userSocket = {}
  }
}

export const sendContactMessage = (text, contact_uuid, user) => {
  window.userSocket.emit('contact-message', {
    recipient_uuid:   contact_uuid,
    sender_uuid:    user.uuid,
    sender_username:  user.username,
    event_text:     text,
    access_token:     token.get()
  })
}

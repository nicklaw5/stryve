
export const sendChannelMessage = (text, contact_uuid, user) => {
	window.user_socket.emit('contact-message', {
		contact_uuid:		channel_uuid,
		sender_uuid:		user.uuid,
		sender_username: 	user.username,
		event_text:			text,
		access_token: 		token.get()
	})
}

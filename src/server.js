var uuid = require('uuid')
var http = require('http')
var express = require('express')
var socketio = require('socket.io')
var striptags = require('striptags');
var client = require('stryve-api-client')

var dev 		= (JSON.parse(process.env.PROD_ENV || '0') == '0')? true: false
	, app		= express()
	, server	= http.Server(app)
	, io 		= socketio(server)
	, port		= 3333

// start the server
server.listen(port, () => {
	console.log("\nListening on *:" + port + "\r\n")
})

/********************************/
/**** ON NEW USER CONNECTION ****/
/********************************/
var users_io = io.of('/users')

users_io.on('connection', function(socket) {

	if(dev)	console.log('User connected and ready.')

	socket.emit('connected', socket.id)

	/***********************************/
	/*** ON CONTACT MESSAGE RECEIVED ***/
	/***********************************/
	socket.on('contact-message', function(payload) {
		
		// parse the text
		payload.event_text = parseEventText(payload.event_text)

		// return if no text to continue with
		if(!payload.event_text.length) {
			if(dev) console.log('Empty string provided. Nothing to do.')
			return
		}

		// prepare request data
		var apiPayload = {
			event_uuid: 	uuid.v1(),
			sender_uuid: 	payload.sender_uuid,
			recipient_uuid:	payload.recipient_uuid,
			event_type: 	'user_message',
			event_text: 	payload.event_text,
			publish_to: 	'both',
			editable: 		'true'
		}

		// send the message back to sender to avoid http latency
		// (we will update it when we get it back from the server)
		socket.emit('contact-message::' + payload.sender_uuid + '::preliminary', apiPayload)

		// send api request
		client.contacts.postContactEvent(
			apiPayload,
			payload.access_token,
			function(res) {
				// send to intended recipient
				users_io.emit('contact-message::' + res.recipient_uuid, res)

				// send back to sender
				users_io.emit('contact-message::' + res.sender_uuid, res)
			},
			function(res) {
				//TODO
				console.log(res)
			}
		)	
	})
})
/* end $users_io */

/********************************/
/*** ON NEW SERVER CONNECTION ***/
/********************************/
var servers_io = io.of('/servers')

servers_io.on('connection', function(socket) {

	if(dev)	console.log('A user has connected to the server.')

	// create some variable to store user and server info
	if(typeof socket.connectedUsers === 'undefined')
		socket['connectedUsers'] =  []

	if(typeof socket.activeServers === 'undefined')
		socket['activeServers'] = []

	/*********************/
	/*** ON DISCONNECT ***/
	/*********************/
	socket.on('disconnect', function() {
		console.log('A user disconnected from the server.')
	})

	// let the user know they have connected successfully
	// send them back their socket id
	servers_io.to(socket.id).emit('connected', socket.id)

	/*************************/
	/*** ON USER CONNECTED ***/
	/*************************/
	socket.on('user-connected', function(payload) {

		var apiPayload = {
			server_uuid: 	payload.server_uuid,
			event_type: 	'user_connected',
			event_text: 	payload.owner_username + ' has connected to ' + payload.server_name + '.',
			publish_to: 	'server_not_self'
		}

		// send the api request
		client.servers.postServerEvent(
			apiPayload,
			payload.access_token,
			function(res) {
				// add the user's info to the socket for later user
				socket.connectedUsers.push({ uuid: res.owner_uuid, username: res.owner_username })

				// add the servers's info to the socket for later user
				socket.activeServers.push({ uuid: res.server_uuid, name: res.server_name })
			
				// besides the socket initiator,  let all users know when a connection is received,
				// even if they don't want to hear it
				socket.broadcast.emit('user-connected', res)
			},
			function(res) {
				//TODO
				if(dev)	console.log(res)
			}
		)
	})

	/****************************/
	/*** ON USER DISCONNECTED ***/
	/****************************/
	// on user disconnected - this may have to done another way. See disconnect below
	socket.on('user-disconnected', function(payload) {
		// TODO
		if(dev) console.log(payload)
	})


	/*******************************/
	/*** ON CHANNEL SUBSCRIPTION ***/
	/*******************************/
	socket.on('subscribe-to-channel', function(payload) {
		// subscribe to the intended channel
		socket.join(payload.channel_uuid)

		// update payload
		payload['uuid'] 		= uuid.v1()
		payload['event_type'] 	= 'user_subscribed'
		payload['event_text'] 	= payload.owner_username + ' has joined your channel'
		
		// broadcast user subscription to all subscribers but the instantiating socket
		socket.broadcast.emit('user-subscribed-to::' + payload.channel_uuid, payload)

		if(dev)
			console.log(payload.owner_username + ' has joined the ' + payload.channel_name + ' channel.')
	})

	/*********************************/
	/*** ON CHANNEL UNSUBSCRIPTION ***/
	/*********************************/
	socket.on('unsubscribe-from-channel', function(payload) {
		// unsubscribe from the intended channel
		socket.leave(payload.channel_uuid)
		
		// modify payload
		payload['uuid'] 		= uuid.v1()
		payload['event_type'] 	= 'user_unsubscribed'
		payload['event_text'] 	= payload.owner_username + ' has left your channel'

		// broadcast user subscription to all subscribers but the instantiating socket
		socket.broadcast.emit('user-unsubscribed-from::' + payload.channel_uuid, payload)

		if(dev)
			console.log(payload.owner_username + ' has left the ' + payload.channel_name + ' channel.')
	})

	/***********************************/
	/*** ON CHANNEL MESSAGE RECEIVED ***/
	/***********************************/
	socket.on('channel-message', function(payload) {
		// parse the text
		payload.event_text = parseEventText(payload.event_text)

		// return if no text to continue with
		if(!payload.event_text.length) {
			if(dev) console.log('Empty string provided. Nothing to do.')
			return
		}

		// prepare request data
		var apiPayload = {
			uuid: 			uuid.v1(),
			channel_uuid: 	payload.channel_uuid,
			event_type: 	'user_message',
			event_text: 	payload.event_text,
			publish_to: 	'channel_and_self',
			editable: 		'true'
		}

		// send the message back to sender to avoid http latency
		// (we will update it when we get it back from the server)
		socket.emit('channel-message::' + payload.channel_uuid + '::preliminary', apiPayload)

		// save the  event to the bdatabase
		client.channels.postChannelEvent(
			apiPayload,
			payload.access_token,
			function(res) {
				servers_io.emit('channel-message::' + res.channel_uuid, res)
			},
			function(res) {
				//TODO
				console.log(res)
			}
		)
	})

	/******************************/
	/*** ON NEW CHANNEL CREATED ***/
	/******************************/
	socket.on('channel-created', function(channel) {
		socket.broadcast.emit('channel-created', channel);
	})

})
/* end $servers_io */

/**
 * Pares the provided string for insecurities.
 *
 * @param {string} text
 * @return string
 */
parseEventText = function(text) {
	// replace certain emojis
	text = text.replace(/<3|&lt;3/g, ":heart:")
	text = text.replace(/<\/3|&lt;&#x2F;3/g, ":broken_heart:")

	// strip any html tags from the text for security
	return striptags(text)
}

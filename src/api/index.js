// const data = require('./mock-data')
// const LATENCY = 16

// export function getAllMessages (cb) {
//   setTimeout(() => {
//     cb(data)
//   }, LATENCY)
// }

// export function createMessage ({ text, thread }, cb) {
//   const timestamp = Date.now()
//   const id = 'm_' + timestamp
//   const message = {
//     id,
//     text,
//     timestamp,
//     threadID: thread.id,
//     threadName: thread.name,
//     authorName: 'Evan'
//   }
//   setTimeout(function () {
//     cb(message)
//   }, LATENCY)
// }

import * as ajax from '../utils/ajax'

export function createAuthSession({ email, password }, cb) {
	// set request options
	var options = ajax.options('post', 'auth/login', {
		email: email,
		password: password
	})

	// console.log(options);
	cb(options)


	// api call here
}
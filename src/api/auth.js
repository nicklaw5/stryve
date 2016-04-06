import * as ajax from '../utils/ajax'

/**
 * Attempts to create an authenticated session with the API server.
 */
export function createAuthSession({ email, password }, cb) {
	// set request options
	// var options = ajax.options('post', 'auth/login', {
	// 	email: email,
	// 	password: password
	// })
	var body = { email: email, password: password }

	// api call here
	cb(ajax.post('auth/login', body, null))
	// console.log(options);
	// cb();
}
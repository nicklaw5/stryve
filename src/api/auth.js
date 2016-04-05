import * as ajax from '../utils/ajax'

/**
 * Attempts to create an authenticated session with the API server.
 *
 * @return 
 */
export function createAuthSession({ email, password }, cb) {
	// set request options
	var options = ajax.options('post', 'auth/login', {
		email: email,
		password: password
	})

	// api call here

	// console.log(options);
	cb(options)
}
import rp from 'request-promise'
const API_BASE = 'http://api.stryve.io/api/'

export function options(method, endpoint, body, include_auth_header) {
	var options = {}

	// set new options
	if(typeof method != 'undefined' && typeof method == 'string')
		options['method'] = method.toUpperCase()

	if(typeof endpoint != 'undefined' && typeof endpoint == 'string')
		options['url'] = API_BASE + endpoint

	if(typeof body != 'undefined' && typeof body == 'object')
		options['body'] = body

	if(typeof include_auth_header != 'undefined' && include_auth_header === true)
		options['headers'] = { 'Authorization': 'some token' }

	return options
}
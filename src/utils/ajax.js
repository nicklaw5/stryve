import request from 'superagent'
const base_url = 'http://api.stryve.io/api/'

// export function options(method, endpoint, body, incl_auth_header) {
// 	var options = {}

// 	if(typeof method === 'string')
// 		options['method'] = method

// 	if(typeof endpoint === 'string')
// 		options['url'] = base_url + endpoint

// 	if(typeof body === 'object')
// 		options['body'] = body

// 	if(typeof incl_auth_header !== 'undefined'
// 		&& incl_auth_header === true)
// 		options['headers'] = { 'Authorization': 'some token' }

// 	options['json'] = true
// 	return options
// }

export function post(endpoint, body, incl_auth_header, cb) {

	request
		.post(base_url + endpoint)
		.set('Content-Type', 'application/json')
		.send(JSON.stringify(body))
		.end((err, res) => {
			cb(res.body)
	})
}

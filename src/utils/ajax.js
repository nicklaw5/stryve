import request from 'superagent'
const base_url = 'http://api.stryve.io/api/'

export function post(endpoint, body, authenticate, cb) {

	if(authenticate) {
		request
			.post(base_url + endpoint)
			.set('Content-Type', 'application/json')
			.set('Authorization', localStorage.access_token)
			.send((typeof body == 'object')? JSON.stringify(body) : '')
			.end((err, res) => {
				cb(res.body)
		})
	} else {
		request
			.post(base_url + endpoint)
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(body))
			.end((err, res) => {
				cb(res.body)
		})
	}
}

export function get(endpoint, body, authenticate, cb) {
	if(authenticate) {
		request
			.get(base_url + endpoint)
			.set('Content-Type', 'application/json')
			.set('Authorization', localStorage.access_token)
			.send((typeof body == 'object')? JSON.stringify(body) : '')
			.end((err, res) => {
				cb(res.body)
		})
	} else {
		request
			.get(base_url + endpoint)
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(body))
			.end((err, res) => {
				cb(res.body)
		})
	}
}

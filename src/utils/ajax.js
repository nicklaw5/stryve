import request from 'request'
import superagent from 'superagent'
const API_BASE = 'http://api.stryve.io/api/'

export function options(method, endpoint, body, incl_auth_header) {
	var options = {}

	if(typeof method === 'string')
		options['method'] = method

	if(typeof endpoint === 'string')
		options['url'] = API_BASE + endpoint

	if(typeof body === 'object')
		options['body'] = body

	// if(typeof incl_auth_header !== 'undefined'
	// 	&& incl_auth_header === true)
	// 	options['headers'] = { 'Authorization': 'some token' }

	options['headers'] = {'Access-Control-Allow-Origin': 'localhost:8080' }

	options['json'] = true
	return options
}

// export function get(endpoint, body, incl_auth_header, cb) {}

export function post(endpoint, body, incl_auth_header, cb) {

	// set the request options
	var options = this.options('POST', endpoint, body, incl_auth_header)

	// request(options, (error, response, body) => {
	// 	console.log(response)
	// });

	superagent
	  .post(API_BASE + endpoint)
	  // .withCredentials()
	  .end(function(err, res){
	  	if(err)
	  		console.log(res);

	  	console.log(res)
	    // assert(200 == res.status);
	    // assert('tobi' == res.text);
	    // next();
	  })

	// rp(options)
	//     .then(function(res) {
	//         // cb(res);
	//         console.log(res)
	//     })
	//     .catch(function(err) {
	//         // cb(err);
	//         console.log(err)
	//     })
}

// export function put(endpoint, body, incl_auth_header, cb) {}

// export function delete(endpoint, body, incl_auth_header, cb) {}
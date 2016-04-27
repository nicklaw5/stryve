module.exports = {

	get: () => {
		return localStorage.access_token
	},

	set: token => {
		localStorage.access_token = token
	},

	destroy: () => {
		delete localStorage.access_token
	}
}
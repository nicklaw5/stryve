const ls = localStorage

module.exports = {

	get: () => {
		return ls.access_token
	},

	set: token => {
		ls.access_token = token
	},

	destroy: () => {
		delete ls.access_token
	}
}
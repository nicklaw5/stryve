import Vue from 'vue'
import Vuex from 'vuex'
import app from './app/store'
import auth from './auth/store'
import users from './users/store'
import servers from './servers/store'
import createLogger from '../middleware/logger'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {},
	modules: {
		app,
		auth,
		users,
		servers
	},
	strict: debug,
	middlewares: debug ? [createLogger()] : []
})
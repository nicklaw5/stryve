import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/store'
import createLogger from '../middleware/logger'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {},
	modules: {
		auth
	},
	strict: debug,
	middlewares: debug ? [createLogger()] : []
})
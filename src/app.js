// css
import './assets/css/normalize.css'
import './assets/css/main.css'
import './assets/css/iconmoon.css'
import '../node_modules/emojify.js/dist/css/basic/emojify.min.css'


// import '../node_modules/emojify.js/dist/css/sprites/emojify.css'
// import '../node_modules/emojify.js/dist/css/sprites/emojify-emoticons.css'

import '../node_modules/emojify.js/dist/css/data-uri/emojify.min.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify-emoticons.min.css'

import 'babel-polyfill'
import Vue from 'vue'
import emojify from 'emojify.js'
import App from './components/App.vue'
import './utils/filters'
import './utils/sizer'

// app configs
Vue.config.debug = true
// emojify.setConfig({ mode: 'data-uri'})
emojify.setConfig({ mode: 'sprite'})
emojify.run()

// create global socket object
window.socket = {}

new Vue({
	el: 'body',
	components: {
		App
	}
})

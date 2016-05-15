// css
import './assets/css/normalize.css'
import './assets/css/main.css'
import './assets/css/iconmoon.css'
import '../node_modules/emojify.js/dist/css/basic/emojify.min.css'

import 'babel-polyfill'
import Vue from 'vue'
import emojify from 'emojify.js'
import App from './components/App.vue'
import './utils/filters'
import './utils/sizer'

// app configs
Vue.config.debug = true
emojify.setConfig({
	mode: 'img',
	img_dir: '../node_modules/emojify.js/dist/images/basic'
})
emojify.run()

// create global socket objects
window.user_socket = {}
window.server_socket = {}

new Vue({
	el: 'body',
	components: { App }
})

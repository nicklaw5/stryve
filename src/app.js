// css
import './assets/css/normalize.css'
import './assets/css/main.css'
import './assets/css/iconmoon.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify.min.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify-emoticons.min.css'

import 'babel-polyfill'
import Vue from 'vue'
import filters from './utils/filters'
import emojify from 'emojify.js'
import App from './components/App.vue'
import './utils/sizer'

// app configs
Vue.config.debug = true
emojify.setConfig({ mode: 'data-uri'})

new Vue({
	el: 'body',
	components: { App }
})

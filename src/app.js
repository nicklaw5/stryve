// css
import './assets/css/normalize.css'
import './assets/css/main.css'
import './assets/css/iconmoon.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify.min.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify-emoticons.min.css'

// npm modules
import 'babel-polyfill'
import Vue from 'vue'
import io from 'socket.io-client'
import moment from 'moment'
import localstore from 'store'
import randomName from 'sillyname'
import emojify from 'emojify.js'

// app files
import store from './vuex/store'
import * as helpers from './helpers'
import { getAllMessages } from './vuex/actions'

// app components
import App from './components/App.vue'

// app configs
Vue.config.debug = true
emojify.setConfig({ mode: 'data-uri'})

// app filters
Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

new Vue({
  el: 'body',
  components: { App }
})
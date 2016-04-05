// css
import './assets/css/normalize.css'
import './assets/css/main.css'
import './assets/css/iconmoon.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify.min.css'
import '../node_modules/emojify.js/dist/css/data-uri/emojify-emoticons.min.css'

// npm modules
import 'babel-polyfill'
import Vue from 'vue'
import emojify from 'emojify.js'

// app files
import store from './vuex/store'

// app components
import Login from './components/Login.vue'
import Register from './components/Register.vue'

// app configs
Vue.config.debug = true
emojify.setConfig({ mode: 'data-uri'})

new Vue({
  el: 'body',
  store,
  components: { Login, Register }
})

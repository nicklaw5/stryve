// css
import './assets/css/normalize.css'
import './assets/css/main.css'
import './assets/css/iconmoon.css'
import './assets/css/emojify.css'

// js
import Vue from 'vue'
import emojify from 'emojify.js'
import moment from 'moment'
import App from './components/App.vue'
import './utils/filters'
import './utils/resize'

// app configs
Vue.config.debug = true
emojify.setConfig({
	mode: 'img',
	img_dir: 'src/assets/img/emoticons'
})
emojify.run()
moment.updateLocale('en', {
	calendar : {
		lastDay : '[Yesterday at] LT',
		sameDay : 'LT',
		nextDay : '[Tomorrow at] LT',
		lastWeek : 'dddd [at] LT',
		nextWeek : 'dddd [at] LT',
		sameElse : 'L'
	}
});

// create global socket objects
window.userSocket = {}
window.serverSocket = {}

new Vue({
	el: 'body',
	components: { App }
})

<template>
	<h1>Login</h1>
	<input type="text" v-model="form.email" @keyup.enter="attemptLogin($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="attemptLogin($event)" placeholder="Password">
	<br><br>
		<label>
			<input type="checkbox" v-model="autoLogin" @click="setAutomaticLogin($event)">
			Log me in automatically next time.
		</label>
	<br><br>

	<auth-message :message="authMessage"></auth-message>
	
	<button class="btn-block" type="button" @click="attemptLogin($event)">Log in</button>
	<br><br>
	Haven't got an account? 
	<a href="" @click.prevent="showRegistrationForm($event)">Register</a>
</template>

<script>
import {
	setAuthMessage,
	toggleAuthForm,
	attemptUserLogin
} from '../vuex/auth/actions'
import * as helpers from '../utils/helpers'
import AuthMessage from './AuthMessage.vue'
import { authMessage, getAccessToken } from '../vuex/auth/getters'

export default {
	data() {
		return {
			autoLogin: false,
			form: {
				email: '',
				password: ''
			}
		}
	},
	components: {
		AuthMessage
	},
	created() {
		helpers.updateTitleText('Login')
		if(typeof localStorage.userEmail == 'string')
			this.form.email = localStorage.userEmail
		this.autoLogin = (localStorage.automaticLogin === 'true')
			? true
			: false
	},
	ready() {
		// if available, attempt to login using access token
		if(!helpers.isNullOrUndefined(this.getAccessToken) && this.autoLogin) {
			this.setAuthMessage('success', 'Logging in...')
			this.attemptUserLogin(null)
		}

		// hide any existing tooltips (some gernally hang after logging out)
		helpers.hideTooltips()
	},
	vuex: {
		getters: {
			authMessage: authMessage,
			getAccessToken: getAccessToken
		},
		actions: {
			setAuthMessage,
			toggleAuthForm,
			attemptUserLogin
		}
	},
	methods: {
		setAutomaticLogin(event) {
			this.autoLogin = event.target.checked
			localStorage.automaticLogin = this.autoLogin
		},
		attemptLogin (event) {
			this.setAuthMessage('success', 'Logging in...')
			this.attemptUserLogin(this.form)
		},
		showRegistrationForm (event) {
			this.toggleAuthForm('register')
		}
	}
}
</script>

<style scoped>
	
</style>

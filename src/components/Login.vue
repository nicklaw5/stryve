<template>
	<h1>Login</h1>
	<input type="text" v-model="form.email" @keyup.enter="attemptLogin($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="attemptLogin($event)" placeholder="Password">
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
import AuthMessage from './AuthMessage.vue'
import { authMessage, getAccessToken } from '../vuex/auth/getters'

export default {
	data() {
		return {
			form: {
				email: 'nick@account.com',
				password: 'test1234'
			}
		}
	},
	components: {
		AuthMessage
	},
	ready() {
		// if available, attempt to login using access token
		if(typeof this.getAccessToken != 'undefined') {
			this.setAuthMessage('success', 'Logging in...')
			this.attemptUserLogin(null, true)
		}
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

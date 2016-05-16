<template>
	<h1>Register</h1>
	<input type="text" v-model="form.username" @keyup.enter="attemptRegistration($event)" placeholder="Username">
	<br><br>
	<input type="email" v-model="form.email" @keyup.enter="attemptRegistration($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="attemptRegistration($event)" placeholder="Password">
	<br><br>
	<auth-message :message="authMessage"></auth-message>
	<button class="btn-block" type="button" @click="attemptRegistration($event)">Register</button>
	<br><br>
	Already have an account? 
	<a href="" @click.prevent="showLoginForm($event)">Login</a>
</template>

<script>
import { 
	setAuthMessage,
	toggleAuthForm,
	attemptUserRegistration
} from '../vuex/auth/actions'
import AuthMessage from './AuthMessage.vue'
import * as helpers from '../utils/helpers'
import { authMessage } from '../vuex/auth/getters'

export default {
	data() {
		return {
			form: {
				username: '',
				email: '',
				password: ''
			}
		}
	},
	components: {
		AuthMessage
	},
	created() {
		helpers.updateTitleText('Register')
		this.setAuthMessage('', '')
	},
	vuex: {
		getters: {
			authMessage: authMessage
		},
		actions: {
			setAuthMessage,
			toggleAuthForm,
			attemptUserRegistration
		}
	},
	methods: {
		attemptRegistration (event) {
			this.setAuthMessage('success', 'Registering...')
			this.attemptUserRegistration(this.form)
		},
		showLoginForm (event) {
			this.toggleAuthForm('login')
		}
	}
}
</script>

<style scoped>

</style>

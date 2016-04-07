<template>
	<h1>Login</h1>
	<input type="text" v-model="form.email" @keyup.enter="attemptLogin($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="attemptLogin($event)" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="attemptLogin($event)">Log in</button>
	<br><br>
	Haven't got an account? 
	<a href="" @click.prevent="showRegistrationForm($event)">Register</a>
</template>

<script>
import { 
	toggleAuthForm,
	attemptUserLogin
} from '../vuex/auth/actions'

export default {
	data() {
		return {
			form: {
				email: 'nick@account.com',
				password: 'test1234'
			}
		}
	},
	vuex: {
		actions: {
			toggleAuthForm,
			attemptUserLogin
		}
	},
	methods: {
		attemptLogin ($event) {
			this.attemptUserLogin(this.form)
		},
		showRegistrationForm ($event) {
			this.toggleAuthForm('register')
		}
	}
}
</script>

<style scoped>
	
</style>

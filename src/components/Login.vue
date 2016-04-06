<template>
	<h1>Login</h1>
	<input type="text" v-model="form.email" @keyup.enter="tryLogin($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="tryLogin($event)" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="tryLogin($event)">Log in</button>
	<br><br>
	Haven't got an account? 
	<a href="" @click.prevent="showRegistrationForm($event)">Register</a>
</template>

<script>
import { 
	loginUser,
	toggleAuthForm 
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
			loginUser,
			toggleAuthForm
		}
	},
	methods: {
		tryLogin ($event) {
			this.loginUser(this.form.email, this.form.password)
		},
		showRegistrationForm ($event) {
			this.toggleAuthForm('register')
		}
	}
}
</script>

<style scoped>
	
</style>

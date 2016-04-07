<template>
	<h1>Register</h1>
	<input type="text" v-model="form.username" @keyup.enter="attemptRegistration($event)" placeholder="Name">
	<br><br>
	<input type="email" v-model="form.email" @keyup.enter="attemptRegistration($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="attemptRegistration($event)" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="attemptRegistration($event)">Register</button>
	<br><br>
	Already have an account? 
	<a href="" @click.prevent="showLoginForm($event)">Login</a>
</template>

<script>
import { 
	toggleAuthForm,
	attemptUserRegistration
} from '../vuex/auth/actions'

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
	vuex: {
		actions: {
			toggleAuthForm,
			attemptUserRegistration
		}
	},
	methods: {
		attemptRegistration ($event) {
			this.attemptUserRegistration(this.form)
		},
		showLoginForm ($event) {
			this.toggleAuthForm('login')
		}
	}
}
</script>

<style scoped>

</style>

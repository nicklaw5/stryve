<template>
	<h1>Login</h1>
	<input type="text" v-model="user.email" @keyup.enter="tryLogin($event)" placeholder="Email">
	<br><br>
	<input type="password" v-model="user.password" @keyup.enter="tryLogin($event)" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="tryLogin($event)">Log in</button>
	<br><br>
	<a href="" @click.prevent="showLoginForm($event)">Register</a>
</template>

<script>
import { loginUser, toggleIsRegistering } from '../vuex/auth/actions'

export default {
	data() {
		return {
			user: {
				email: 'nick@account.com',
				password: 'test1234'
			}
		}
	},
	vuex: {
		getters: {},
		actions: {
			loginUser,
			toggleIsRegistering
		}
	},
	computed: {

	},
	methods: {
		tryLogin ($event) {
			this.loginUser(this.user.email, this.user.password)
		},
		showLoginForm ($event) {
			this.toggleIsRegistering()
		}
	}
}
</script>

<style scoped></style>

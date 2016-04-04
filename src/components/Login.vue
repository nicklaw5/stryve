<template>
	<h1>Login</h1>
	<input type="text" v-model="user.email" @keyup.enter="tryLogin" placeholder="Email">
	<br><br>
	<input type="password" v-model="user.password" @keyup.enter="tryLogin" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="tryLogin">Log in</button>
	<br><br>
	<a href="" @click.prevent="store.isRegistering = !store.isRegistering">Register</a>
</template>

<script>
import store from '../vuex/store'
import { loginUser } from '../vuex/actions'

export default {
	data() {
		return {
			store: store.state,
			user: {
				email: 'nick@account.com',
				password: 'test1234'
			}
		}
	},
	vuex: {
		getters: {},
		actions: {
			loginUser
		}
	},
	methods: {
		tryLogin(e) {
			this.loginUser(this.user.email, this.user.password)
		}
	}
}
</script>

<style scoped></style>

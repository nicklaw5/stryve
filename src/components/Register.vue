<template>
	<h1>Register</h1>
	<input type="text" v-model="form.username" @keyup.enter="registerUser" placeholder="Name">
	<br><br>
	<input type="email" v-model="form.email" @keyup.enter="registerUser" placeholder="Email">
	<br><br>
	<input type="password" v-model="form.password" @keyup.enter="registerUser" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="registerUser">Register</button>
	<br><br>
	Already have an account? 
	<a href="" @click.prevent="showLoginForm($event)">Login</a>
</template>

<script>
import { 
	registerUser,
	toggleAuthForm
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
			registerUser,
			toggleAuthForm
		}
	},
	methods: {
		tryRegister ($event) {
			this.registerUser(this.form.username, this.form.email, this.form.password)
		},
		showLoginForm ($event) {
			this.toggleAuthForm('login')
		}
	}
}
</script>

<style scoped>

</style>

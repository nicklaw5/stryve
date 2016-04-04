<template>
	<h1>Register</h1>
	<input type="text" v-model="user.username" @keyup.enter="registerUser" placeholder="Name">
	<br><br>
	<input type="email" v-model="user.email" @keyup.enter="registerUser" placeholder="Email">
	<br><br>
	<input type="password" v-model="user.password" @keyup.enter="registerUser" placeholder="Password">
	<br><br>
	<button class="btn-block" type="button" @click="registerUser">Register</button>
	<br><br>
	<a href="" @click.prevent="store.isRegistering = !store.isRegistering">Login</a>
</template>

<script>
import store from '../vuex/store'

export default {
	data() {
		return {
			store: store.state,
			user: {
				username: '',
				email: '',
				password: ''
			}
		}
	}
}
</script>

<style scoped>

</style>

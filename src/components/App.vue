<template>
	
	<!-- if authenticated -->
	<div v-if="isAuthenticated">
		<h1>logged in</h1>
	</div>
	<!-- /if authenticated -->

	<!-- not authenticated -->
	<div v-else id="login-or-register">
		<div id="login-or-register-inner">
			<login v-if="authForm == 'login'"></login>
			<register v-else></register>    		
    	</div>
	</div>
    <!-- /not authenticated -->
</template>

<script>
import store from '../vuex/store'
import Login from './Login.vue'
import Register from './Register.vue'
import { authForm, isAuthenticated } from '../vuex/auth/getters'

export default {
	store,
	vuex: {
		getters: {
			authForm: authForm,
			isAuthenticated: isAuthenticated,
		},
	},
	components: {
		Login,
		Register
	}
}
</script>

<style scoped>

</style>

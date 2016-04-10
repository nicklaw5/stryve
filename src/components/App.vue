<template>
	<!-- if authenticated -->
	<div v-if="isAuthenticated">
		<!-- <a href="" @click.prevent="attemptUserLogout($event)">Logout</a> -->
		<server-list></server-list>
		<div id="server-channels-container">
			<contacts v-if="showContactsPanel"></contacts>
			<server-channels v-else></server-channels>
		</div>
		<!-- <channel-messages></channel-messages> -->
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
// base store
import store from '../vuex/store'

// components
import Login from './Login.vue'
import Contacts from './Contacts.vue'
import Register from './Register.vue'
import ServerList from './ServerList.vue'
import ServerChannels from './ServerChannels.vue'
import ChannelMessages from './ChannelMessages.vue'

// getters
import { showContactsPanel } from '../vuex/app/getters'
import { authForm, isAuthenticated } from '../vuex/auth/getters'
import { setAuthMessage, attemptUserLogout } from '../vuex/auth/actions'

export default {
	created() {
		
	},
	store,
	vuex: {
		getters: {
			authForm: authForm,
			isAuthenticated: isAuthenticated,
			showContactsPanel: showContactsPanel
		},
		actions: {
			setAuthMessage,
			attemptUserLogout
		}
	},
	components: {
		Login,
		Contacts,
		Register,
		ServerList,
		ServerChannels,
		ChannelMessages
	}
}
</script>

<style scoped>

</style>

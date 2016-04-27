<template>
	<!-- if authenticated -->
	<div v-if="isAuthenticated">
		<server-list></server-list>
		<div id="server-channels-container">
			<contacts-panel v-if="contactsPanel == 'contacts'"></contacts-panel>
			<channels-panel v-else></channels-panel>
			<user-panel></user-panel>
		</div>
		<channel-container></channel-container>
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
import Register from './Register.vue'
import UserPanel from './UserPanel.vue'
import ServerList from './ServerList.vue'
import ContactsPanel from './ContactsPanel.vue'
import ChannelsPanel from './ChannelsPanel.vue'
import ChannelContainer from './ChannelContainer.vue'

// getters
import { getChannelPanel } from '../vuex/app/getters'
import { authForm, isAuthenticated } from '../vuex/auth/getters'
import { setAuthMessage, attemptUserLogout } from '../vuex/auth/actions'

export default {
	store,
	vuex: {
		getters: {
			authForm: authForm,
			isAuthenticated: isAuthenticated,
			contactsPanel: getChannelPanel
		},
		actions: {
			setAuthMessage,
			attemptUserLogout
		}
	},
	components: {
		Login,
		Register,
		UserPanel,
		ServerList,
		ChannelsPanel,
		ContactsPanel,
		ChannelContainer
	}
}
</script>

<style scoped>

</style>

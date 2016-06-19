<template>
	<!-- if authenticated -->
	<div v-if="isAuthenticated">
		<server-list></server-list>
		<div id="server-channels-container">
			<contacts-panel v-if="contactsPanel == 'contacts'"></contacts-panel>
			<channels-panel v-else></channels-panel>
			<user-panel></user-panel>
		</div>
		<main-container></main-container>
	</div>
	<!-- /if authenticated -->

	<!-- not authenticated -->
	<div v-else id="login-or-register">
		<div id="release-tag" class="release-front">
			<span>v0.4.0-alpha</span>
		</div>
		<div id="login-or-register-inner">
			<p style="text-align: center"><img width="80px" src="../assets/img/logo-100x100.png"></p>
			<login v-if="authForm == 'login'"></login>
			<register v-else></register>    		
    	</div>
	</div>
    <!-- /not authenticated -->

    <!-- modals -->
    <server-menu v-if="serverMenu"></server-menu>
    <new-server-modal v-if="showNewServerModal"></new-server-modal>
    <new-channel-modal v-if="showNewChannelModal"></new-channel-modal>
    <server-invitation-modal v-if="showServerInvitivation"></server-invitation-modal>
    <!-- /modals -->

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
import MainContainer from './MainContainer.vue'

// modals
import ServerMenu from './modals/ServerMenu.vue'
import NewServerModal from './modals/NewServerModal.vue'
import NewChannelModal from './modals/NewChannelModal.vue'
import ServerInvitationModal from './modals/ServerInvitationModal.vue'

// getters
import { authForm, isAuthenticated } from '../vuex/auth/getters'
import { setAuthMessage, attemptUserLogout } from '../vuex/auth/actions'
import { 
	getServerMenu,
	getChannelPanel,
	getNewServerModal,
	getNewChannelModal,
	getServerInvitivationModal
} from '../vuex/app/getters'

export default {
	store,
	vuex: {
		getters: {
			authForm: authForm,
			contactsPanel: getChannelPanel,
			isAuthenticated: isAuthenticated,

			// modals
			serverMenu: getServerMenu,
			showNewServerModal: getNewServerModal,
			showNewChannelModal: getNewChannelModal,
			showServerInvitivation: getServerInvitivationModal
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
		ServerMenu,
		ChannelsPanel,
		ContactsPanel,
		NewServerModal,
		NewChannelModal,
		MainContainer,
		ServerInvitationModal
	}
}
</script>

<style scoped>

</style>

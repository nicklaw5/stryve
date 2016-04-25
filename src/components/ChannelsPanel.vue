<template>	
	<div v-if="isOwner" id="channels-top"
		:class="{ 'server-menu-open': serverMenu }"
		@click="toggleServerMenu()">
		<h3>{{ server.name }}</h3>
		<span><i class="icon-menu7"></i></span>
	</div>
	<div v-else id="channels-top">
		<h3>{{ server.name }}</h3>
	</div>

	<div v-if="isOwner" id="channels-list-header">
		<div @click="showModal('newChannelModal')" id="channels-list-header-inner">
			<span>Channels</span>
			<span class="plus">
				<i class="icon-plus22"></i>
			</span>
		</div>
	</div>

	<div id="channels-list">
		<ul>
			<li v-for="channel in server.channels"
				:class="{ 'listening': channel.listening, 'active': channel.active }">
				<span class="channel-name" @click="switchChannels(channel.uuid)">
					<span class="hashtag">#</span>{{ channel.name }}
				</span>
				<span v-if="isOwner" class="icons">
					<!-- <i class="icon icon-hyperlink"></i>  -->
					<i class="icon icon-cog7"></i>
				</span>
			</li>
		</ul>
	</div>

	<new-channel-modal v-if="showNewServerModal"></new-channel-modal>

	<server-menu v-if="serverMenu"></server-menu>

	<server-invitation v-if="serverInvitivation"></server-invitation>

</template>

<script>
import ServerMenu from './ServerMenu.vue'
import { getUser } from '../vuex/users/getters'
import NewChannelModal from './modals/NewChannelModal.vue'
import ServerInvitation from './modals/ServerInvitation.vue'
import { switchChannels, showModal, toggleServerMenu } from '../vuex/servers/actions'
import { getServer, getNewChannelModal, getServerMenu, getServerInvitivation } from '../vuex/servers/getters'

export default {
	components: {
		ServerMenu,
		NewChannelModal,
		ServerInvitation
	},
	computed: {
		isOwner () {
			return this.user.uuid === this.server.owned_by
		}
	},
	vuex: {
		getters: {
			user: getUser,
			server: getServer,
			serverMenu: getServerMenu,
			showNewServerModal: getNewChannelModal,
			serverInvitivation: getServerInvitivation
		},
		actions: {
			showModal,
			switchChannels,
			toggleServerMenu
		}
	}
}
</script>

<style scoped></style>

<template>	
	<div v-if="isOwner" id="channels-top"
		class="is-owner" 
		:class="{ 'server-menu-open': showServerMenu }"
		@click="toggleServerMenu()">
		<h3>{{ server.name }}</h3>
		<span v-if="showServerMenu"><i class="icon-x"></i></span>
		<span v-else><i class="icon-menu7"></i></span>
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
					<!-- <i class="icon-cog7"></i> -->
				</span>
			</li>
		</ul>
	</div>

</template>

<script>
import { getUser } from '../vuex/users/getters'
import { getServerMenu } from '../vuex/app/getters'
import { switchChannels } from '../vuex/servers/actions'
import { showModal, toggleServerMenu } from '../vuex/app/actions'
import { getServer } from '../vuex/servers/getters'

export default {
	computed: {
		isOwner () {
			return this.user.uuid === this.server.owned_by
		}
	},
	vuex: {
		getters: {
			user: getUser,
			server: getServer,
			showServerMenu: getServerMenu
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

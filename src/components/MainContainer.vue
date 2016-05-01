<template>
	<div id="channel-messages-container">

		<main-header></main-header>

		<channel-container v-if="channelPanel == 'channels'"></channel-container>
		<contact-container v-else></contact-container>

		<channel-users v-if="channelPanel == 'channels'"></channel-users>
	</div>
</template>

<script>
import MainHeader from './MainHeader.vue'
import ChannelUsers from './ChannelUsers.vue'
import ChannelContainer from './ChannelContainer.vue'
import ContactContainer from './ContactContainer.vue'
import { getChannelPanel } from '../vuex/app/getters'
import { getCurrentContact } from '../vuex/contacts/getters'

export default {
	components: {
		MainHeader,
		ChannelUsers,
		ChannelContainer,
		ContactContainer,
	},
	vuex: {
		getters: {
			channelPanel: getChannelPanel,
			contact: getCurrentContact
		},
		actions: {}
	},
	methods: {}
}
</script>

<style scoped></style>

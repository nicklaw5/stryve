<template>
	<div id="chat-server-menu">
		<ul>
			<li @click="showModal('serverInvitivation')">New Invitation</li>
			<!-- <li>Server Settings</li>
			<li>Notification Settings</li> -->
		</ul>
	</div>
</template>

<script>
import { showModal } from '../vuex/servers/actions'

export default {
	vuex: {
		getters: {},
		actions: {
			showModal
		}
	}
}
</script>

<style scoped></style>

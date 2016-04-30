<template>
	<div id="chat-server-menu">
		<ul>
			<li @click="showModal('serverInvitivationModal')">New Invitation</li>
			<!-- <li>Server Settings</li>
			<li>Notification Settings</li> -->
		</ul>
	</div>
</template>

<script>
import { showModal } from '../../vuex/app/actions'

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

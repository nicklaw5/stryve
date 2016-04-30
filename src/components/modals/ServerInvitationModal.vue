<template>
	<div id="server-invitation-modal" class="modal modal-common">

		<div class="form-element-wrapper">
			<label>Share this token with a friend:</label>
			<input type="text" disabled v-model="token">
		</div>
		<div class="form-element-wrapper">
			<button type="button"
					@click="closeModal()">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import { hideModal } from '../../vuex/app/actions'
import { getCurrentServer } from '../../vuex/servers/getters'
import { getServerInvitivationToken } from '../../vuex/servers/getters'
import { generateServerInvitation, resetServerInvitivation } from '../../vuex/servers/actions'

export default {
	ready() {
		this.generateServerInvitation(this.server)
	},
	vuex: {
		getters: {
			server: getCurrentServer,
			token: getServerInvitivationToken
		},
		actions: {
			hideModal,
			resetServerInvitivation,
			generateServerInvitation,
		}
	},
	methods: {
		closeModal() {
			this.hideModal('serverInvitivationModal')
			this.resetServerInvitivation()
		}
	}

}
</script>

<style scoped>
	input {
		text-align: center;
	}
</style>

<template>
	<div id="new-channel-modal" class="modal modal-common">

		<input type="hidden" v-model="">

		<div class="form-element-wrapper">
			<label>Channel Name:</label>
			<input v-model="form.name" type="text">
		</div>
		<div class="form-element-wrapper">
			<!-- <label>
				<input type="checkbox" v-model="form.private" />
				This is a private channel.
			</label> -->
		</div>
		<div class="form-element-wrapper">
			<button class="float-right"
					type="button"
					@click="createNewChannel(form)">
				Create Channel
			</button>
			<button type="button"
					@click="hideModal('newChannelModal')">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import randomName from 'sillyname'
import { hideModal } from '../../vuex/app/actions'
import { getCurrentServer } from '../../vuex/servers/getters'
import { createNewChannel } from '../../vuex/servers/actions'

export default {
	data() {
		return {
			form: {
				server: '',
				name: '',
				private: false
			}
		}
	},
	ready() {
		this.form.name = randomName()
		this.form.server = this.currentServer
	},
	vuex: {
		getters: {
			currentServer: getCurrentServer
		},
		actions: {
			hideModal,
			createNewChannel
		}
	}
}
</script>

<style scoped></style>

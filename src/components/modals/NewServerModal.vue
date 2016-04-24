<template>
	<!-- new server modal -->
	<div id="new-server-modal" class="modal new-channel-or-server">
		<div class="form-element-wrapper">
			<label>Server Name:</label>
			<input v-model="form.name" type="text">
		</div>
		<div class="form-element-wrapper">
			<label>Server Region:</label>
			<select v-model="form.region">
				<option v-for="region in regions" value="{{ region.name }}">{{ region.location }}</option>
			</select>
		</div>
		<div class="form-element-wrapper">
			<label>
				<input type="checkbox" v-model="form.private">
				This is a private server.
			</label>
		</div>
		<div class="form-element-wrapper">
			<button id="new-server-modal-create"
					class="float-right"
					type="button"
					@click="createNewServer(form)">
				Create Server
			</button>
			<button id="new-server-modal-cancel"
					type="button"
					@click="hideModal('newServerModal')">
				Cancel
			</button>
		</div>
	</div>
	<!-- /new server modal -->
</template>

<script>
import randomName from 'sillyname'
import { getServerRegions } from '../../vuex/servers/getters'
import { fetchServerRegions, hideModal, createNewServer } from '../../vuex/servers/actions'

export default {
	data() {
		return {
			form: {
				name: '',
				region: '',
				private: false
			}
		}
	},
	created() {
		this.fetchServerRegions()
	},
	ready() {
		this.form.name = randomName()
	},
	vuex: {
		getters: {
			regions: getServerRegions
		},
		actions: {
			hideModal,
			createNewServer,
			fetchServerRegions
		}
	}
}
</script>

<style scoped></style>

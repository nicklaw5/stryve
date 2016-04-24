<template>
	<!-- new server modal -->
	<div id="new-server-modal" class="modal new-channel-or-server">
		<div class="form-element-wrapper">
			<label>Server Name:</label>
			<input v-model="server_name" type="text">
		</div>
		<div class="form-element-wrapper">
			<label>Server Region:</label>
			<select v-model="server_region">
				<option v-for="region in chat_server_regions" value="{{ region.name }}">{{ region.location }}</option>
			</select>
		</div>
		<div class="form-element-wrapper">
			<label>
				<input type="checkbox" v-model="server_private" />
				This is a private server.
			</label>
		</div>
		<div class="form-element-wrapper">
			<button id="new-server-modal-create"
					class="float-right"
					type="button"
					@click="createChatServer()">
				Create Server
			</button>
			<button id="new-server-modal-cancel"
					type="button"
					@click="hideNewServerModal()">
				Cancel
			</button>
		</div>
	</div>
	<!-- /new server modal -->
</template>

<script>
export default {
	data() {
		return {
			server_name: '',
			server_region: '',
			server_private: false
		}
	},
	vuex: {
		getters: {
			
		},
		actions: {
			
		}
	},
	methods: {
		
	}
}
</script>

<style scoped></style>

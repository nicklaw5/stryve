<template>
	<div id="new-server-modal" class="modal modal-common">
		<div id="new-server-options">
			<h2>
				<a @click.prevent="switchForm($event, 'join')">
					Join Server
				</a>
				&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				<a @click.prevent="switchForm($event, 'new')">
					Create Server
				</a>
			</h2>
				
			<br>
			<button	
				v-if="whichForm == null"
				type="button"
				@click="hideModal('newServerModal')">
				Cancel
			</button>
		</div>

		<div v-if="whichForm == 'join'">
			<div class="form-element-wrapper">
				<label>Enter Inivite Token:</label>
				<input v-model="token" type="text">
			</div>
			<div class="form-element-wrapper">
				<button class="float-right"
						type="button"
						@click="tryJoinServer()">
					Join Server
				</button>
				<button	type="button"
						@click="hideModal('newServerModal')">
					Close
				</button>
			</div>
		</div>

		<div v-if="whichForm == 'new'">
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
				<button class="float-right"
						type="button"
						@click="createNewServer(form)">
					Create Server
				</button>
				<button type="button"
						@click="hideModal('newServerModal')">
					Close
				</button>
			</div>
		</div>

	</div>
</template>

<script>
import randomName from 'sillyname'
import { getServerRegions } from '../../vuex/servers/getters'
import { fetchServerRegions, hideModal, createNewServer, joinServer } from '../../vuex/servers/actions'

export default {
	data() {
		return {
			token: '',
			whichForm: null,
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
			joinServer,
			createNewServer,
			fetchServerRegions
		}
	},
	methods: {
		tryJoinServer($event) {
			if(this.token.trim().length)
				this.joinServer(this.token)
		},
		switchForm($event, form) {
			this.whichForm = form
		}
	}

}
</script>

<style scoped></style>

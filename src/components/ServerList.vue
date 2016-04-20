<template>
	<div id="server-list-container">
		<ul>
			<li @click="switchChannelsPanel('contacts')"
				:class="{'active': channelPanel == 'contacts' }">
				<i class="icon-users"></i>
			</li>
		</ul>

		<hr>

		<ul>
			<li v-for="server in servers"
				@click="switchServers(server)"
				:class="{'active': (server.active) }">
				{{ server.name | capitalizeFirstLetter }}
			</li>
		</ul>
		<div @click="showNewServerModal($event)" id="new-server">
			<span><i class="icon-plus22"></i></span>
		</div>		
	</div>
</template>

<script>
import { getServers } from '../vuex/servers/getters'
import { getChannelPanel } from '../vuex/app/getters'
import { switchChannelsPanel } from '../vuex/app/actions'
import { switchServers, fetchServerList } from '../vuex/servers/actions'

export default {
	created() {
		this.fetchServerList()
	},
	ready() {
		// TODO resize window fix (temporary -- this needs to be fixed)
		window.dispatchEvent(new Event('resize'))
	},
	vuex: {
		getters: {
			servers: getServers,
			channelPanel: getChannelPanel
		},
		actions: {
			switchServers,
			fetchServerList,
			switchChannelsPanel
		}
	}
}
</script>

<style scoped></style>

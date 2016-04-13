<template>
	<div id="server-list-container">
		<ul>
			<li @click="contactsPanel($event)"
				:class="{'active': showContactsPanel }">
				<i class="icon-users"></i>
			</li>
		</ul>

		<hr>

		<ul>
			<li v-for="server in servers"
				@mouseover="showServerTooltip($event, server.name)"
				@mouseleave="hideTooltips($event)"
				@click="changeServers($event, server)"
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
import { showContactsPanel } from '../vuex/app/getters'
import { setShowContactsPanel } from '../vuex/app/actions'
import { 
	switchServers,
	resetServerList,
	retrieveServerList,
	emptyServerChannels,
	retrieveServerChannels,
} from '../vuex/servers/actions'

export default {
	created() {
		this.retrieveServerList()
	},
	ready() {
		// resize window fix (temporary -- this needs to be fixed)
		window.dispatchEvent(new Event('resize'))
	},
	vuex: {
		getters: {
			servers: getServers,
			showContactsPanel: showContactsPanel
		},
		actions: {
			switchServers,
			resetServerList,
			retrieveServerList,
			emptyServerChannels,
			setShowContactsPanel,
			retrieveServerChannels
		}
	},
	methods: {
		changeServers(event, server) {
			this.switchServers(server)
			// this.setShowContactsPanel(false)
			// this.emptyServerChannels()
			// this.retrieveServerChannels(server)
		},
		contactsPanel(event) {
			this.resetServerList()
			this.emptyServerChannels()
			this.setShowContactsPanel(true)
		}
	}
}
</script>

<style scoped></style>

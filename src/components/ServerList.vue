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
				@mouseover="showServerTooltip($event, server.name)"
				@mouseleave="hideTooltips()"
				@click="switchServers(server.uuid)"
				:class="{'active': (server.active) }">
				{{ server.name | capitalizeFirstLetter }}
			</li>
		</ul>
		<div id="new-server"
			@click="showModal('newServerModal')">
			<span><i class="icon-plus22"></i></span>
		</div>
	</div>

</template>

<script>
import { getServers } from '../vuex/servers/getters'
import { getChannelPanel } from '../vuex/app/getters'
import { switchChannelsPanel, showModal } from '../vuex/app/actions'
import { fireWindowResizeEvent, hideTooltips } from '../utils/helpers'
import { switchServers, fetchServerList } from '../vuex/servers/actions'

export default {
	created() {
		this.fetchServerList()
	},
	ready() {
		this.fireWindowResizeEvent()
	},
	vuex: {
		getters: {
			servers: getServers,
			channelPanel: getChannelPanel
		},
		actions: {
			showModal,
			hideTooltips,
			switchServers,
			fetchServerList,
			switchChannelsPanel,
			fireWindowResizeEvent
		}
	},
	methods: {
		showServerTooltip: (event, text) => {
			// set top and left attributes
			var offsetTop = (event.target.offsetTop + Math.floor(event.target.offsetHeight / 3)) - event.target.parentElement.parentElement.scrollTop;
			var offsetLeft = event.target.offsetWidth + 18;

			// create the tooltip
			var tooltip = document.createElement('span');
			tooltip.style.cssText = 'position:fixed;top:'+offsetTop+'px;left:'+offsetLeft+'px;z-index:999;';
			tooltip.className += ' tooltip';
			tooltip.innerHTML = text;

			// create the tringle pointer
			var tooltip_pointer = document.createElement('span');
			tooltip_pointer.style.cssText = 'position:fixed;top:'+(offsetTop + 4)+'px;left:'+(offsetLeft - 7)+'px;z-index:999;';
			tooltip_pointer.className += ' tooltip-pointer tooltip-pointer-left';
			
			// insert both the tooltip and pointer
			document.body.appendChild(tooltip);
			document.body.appendChild(tooltip_pointer);
		},
	}
}
</script>

<style scoped></style>

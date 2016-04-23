<template>	
	<div id="channels-top" @click="toggleServerMenu()">
		<h3>{{ server.name }}</h3>
		<span><i class="icon-menu7"></i></span>
	</div>

	<div id="channels-list-header">
		<div @click="showNewChannelModal()" id="channels-list-header-inner">
			<span>Channels</span>
			<span class="plus"><i class="icon-plus22"></i></span>
		</div>
	</div>

	<div id="channels-list">
		<ul>
			<li v-if="channelsSet" v-for="channel in server.channels"
				:class="{ 'listening': channel.listening, 'active': channel.active }">
				<span class="channel-name" @click="switchChannels(channel.uuid)">
					<span class="hashtag">#</span>{{ channel.name }}
				</span>
				<span class="icons">
					<i class="icon icon-hyperlink"></i> 
					<i class="icon icon-cog7"></i>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import * as helpers from '../utils/helpers'
import { getServer } from '../vuex/servers/getters'
import { switchChannels } from '../vuex/servers/actions'

export default {
	computed: {
		channelsSet() {
			return !helpers.isEmptyObject(this.server.channels)
		}
	},
	vuex: {
		getters: {
			server: getServer
		},
		actions: {
			switchChannels
		}
	}
}
</script>

<style scoped></style>

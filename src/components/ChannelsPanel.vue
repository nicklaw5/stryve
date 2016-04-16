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
			<li v-for="channel in channels"
				v-bind:class="{ 'listening': channel.listening, 'active': channel.active }">
				<span class="channel-name"
						@click="switchChatChannels(channel)">
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
import { getServer } from '../vuex/servers/getters'
import { getChannel, getChannels } from '../vuex/channels/getters'


export default {
	vuex: {
		getters: {
			server: getServer,
			channel: getChannel,
			channels: getChannels
		}
	}
}
</script>

<style scoped></style>

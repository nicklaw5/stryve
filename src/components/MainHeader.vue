<template>
	<div id="channel-messages-header-wrapper">
		<div id="channel-messages-header-left">
			<h3>
				<div v-if="channelPanel == 'contacts'">
					<span v-if="contactSet" class="hashtag">@
					</span><span class="channel">{{ 'user.username' }}</span>
				</div>
				<div v-else>
					<span v-if="channelSet" class="hashtag">#</span>
					<span class="channel">{{ channel.name }}</span>
				</div>
			</h3>
		</div>

		<div id="beta-tag">
			<span>v0.3.0-beta</span>
		</div>
		
		<!-- <div id="channel-messages-header-right">
			<ul>
				<li @click="minimize()"><i class="icon-minus3"></i></li>
				<li @click="toggleMaximize()"><i class="icon-square-up-right" :class="{ 'icon-square-down-left': isMaximized }"></i></li>
				<li @click="logOutAndClose()"><i class="icon-cross2"></i></li>
			</ul>	
		</div> -->
	</div>
</template>

<script>
import * as helpers from '../utils/helpers'
import { getChannel } from '../vuex/servers/getters'
import { getChannelPanel } from '../vuex/app/getters'

export default {
	props: ['channel'],
	computed: {
		contactSet() {
			return true
		},
		channelSet() {
			return !helpers.isEmptyObject(this.channel)
		}
	},
	vuex: {
		getters: {
			channel: getChannel,
			channelPanel: getChannelPanel
		}
	}
}
</script>

<style scoped>
	#beta-tag {
		cursor:	default;
		float: right;
		padding: 5px;
		color: #738bd7;
		font-weight: bold;
		font-size: .8em;
	}
</style>

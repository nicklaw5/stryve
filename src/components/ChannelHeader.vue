<template>
	<div id="channel-messages-header-wrapper">
		<div v-if="channelSet" id="channel-messages-header-left">
			<h3>
				<span class="hashtag">#</span><span class="channel">{{ channel.name }}</span>
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

export default {
	props: ['channel'],
	computed: {
		channelSet() {
			return !helpers.isEmptyObject(this.channel)
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
	}
</style>

<template>
	<div id="channel-messages-container">
		<div id="channel-messages-header-wrapper">
			<div id="channel-messages-header-left">
				<h3 v-if="channelActive">
					<span class="hashtag">#</span><span class="channel">{{ channel.name }}</span>
				</h3>				
			</div>

			<div id="channel-messages-header-right">
				<ul>
					<li @click="minimize()"><i class="icon-minus3"></i></li>
					<li @click="toggleMaximize()"><i class="icon-square-up-right" :class="{ 'icon-square-down-left': isMaximized }"></i></li>
					<li @click="logOutAndClose()"><i class="icon-cross2"></i></li>
				</ul>	
			</div>
		</div>

		<div id="channel-messages">
			<div v-if="channelActive" id="user-input">
				<div id="user-input-inner">
					<div id="user-input-container">
						<div id="user-upload">
							<span><i class="icon-share"></i></span>
						</div>
						<div id="user-message-input">
							<input id="chat_message" v-model="chat_message" @keyup.enter="sendMessage()" type="text" placeholder="Chat in {{ channel.name }}..." autocomplete="off">
							<span class="icon-grid"></span>
						</div>
					</div>
				</div>
			</div>
			<div id="messages-container">
				<ul>
					<li v-for="event in channel.events">
						<div v-if="event.event_type == 'user_message'">
							<div>
								<span class="username">{{ event.owner_username }}</span>
							</div>
							<div>
								<span class="message">{{{ event.event_text }}}</span>
							</div>
						</div>
						<div v-else>
							<div class="channel-event">
								<span class="subscriber" v-bind:class="{ 'unsubscriber': event.event_type === 'user_unsubscribed' }">{{ event.event_text }}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<channel-users v-if="channelPanel == 'channels'"></channel-users>
				
	</div>
</template>

<script>
import ChannelUsers from './ChannelUsers.vue'
import { getUser } from '../vuex/users/getters'
import { getChannel } from '../vuex/servers/getters'
import { getChannelPanel } from '../vuex/app/getters'
import * as helpers from '../utils/helpers'

export default {
	data() {
		return {
			chat_message: ''
		}
	},
	computed: {
		channelActive() {
			return !helpers.isEmptyObject(this.channel)
		}
	},
	components: {
		ChannelUsers
	},
	vuex: {
		getters: {
			user: getUser,
			channel: getChannel,
			channelPanel: getChannelPanel
		},
		actions: {
			
		}
	},
	methods: {
		
	}
}
</script>

<style scoped></style>

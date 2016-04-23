<template>
	<div id="channel-messages-container">

		<channel-header :channel="channel"></channel-header>

		<div v-if="channelSet && channel.ready" id="channel-messages">
			
			<div id="user-input">
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
								<span class="subscriber" :class="{ 'unsubscriber': event.event_type === 'user_unsubscribed' }">{{ event.event_text }}</span>
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
import * as helpers from '../utils/helpers'
import ChannelUsers from './ChannelUsers.vue'
import ChannelHeader from './ChannelHeader.vue'
import { getUser } from '../vuex/users/getters'
import { getChannelPanel } from '../vuex/app/getters'
import { getChannel } from '../vuex/servers/getters'

export default {
	data() {
		return {
			chat_message: ''
		}
	},
	computed: {
		channelSet() {
			return !helpers.isEmptyObject(this.channel)
		}
	},
	components: {
		ChannelUsers,
		ChannelHeader
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

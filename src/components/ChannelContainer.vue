<template>
	<div id="channel-messages-container">

		<channel-header :channel="channel"></channel-header>

		<div v-if="channel.ready" id="channel-messages">
			
			<div id="user-input">
				<div id="user-input-inner">
					<div id="user-input-container">
						<div id="user-upload">
							<span><i class="icon-share"></i></span>
						</div>
						<div id="user-message-input">
							<input id="channel_message" 
									v-model="message" 
									@keyup.enter="sendMessage(message)"
									type="text" 
									placeholder="Chat in {{ channel.name }}..." 
									autocomplete="off">
							<span class="icon-grid"></span>
						</div>
					</div>
				</div>
			</div>

			<div id="messages-container">
				<ul>
					<li v-for="event in channel.events">
						<div v-if="event.event_type == 'user_message'">
							<div class="message-username-container">
								<span class="username">{{ event.owner_username }}</span>
								<span class="timestamp">{{ event.created_at | formatTimestamp 'h:mma' }}</span>
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
import { getChannel/*, getMessageText*/ } from '../vuex/servers/getters'
import { sendMessage/*, updateMessageText*/ } from '../vuex/servers/actions'

export default {
	data() {
		return {
			message: ''
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
			// message: getMessageText,
			channelPanel: getChannelPanel
		},
		actions: {
			sendMessage,
			// updateMessageText
		}
	},
	methods: {
		// onKeyUpMessageEvent(event, text) {

		// 	(event.which === 13 && this.message.trim().length)	// Enter key
		// 		? this.sendMessage()
		// 		: this.updateMessageText(text)
		// }
	}
}
</script>

<style scoped></style>

<template>

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
							@keyup.enter="trySendMessage()"
							type="text" 
							placeholder="Chat in {{ channel.name }}..." 
							autocomplete="off">
						<!-- <span class="icon-grid"></span> -->
					</div>
				</div>
			</div>
		</div>

		<div v-el:container id="messages-container" class="channels">
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
							<span class="subscriber"
								:class="{ 'unsubscriber': event.event_type === 'user_unsubscribed' }">
								{{ event.event_text }}
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>

	</div>

</template>

<script>
import * as helpers from '../utils/helpers'
import { getChannelPanel } from '../vuex/app/getters'
import { getChannel } from '../vuex/servers/getters'
import { sendMessage } from '../vuex/servers/actions'

export default {
	data() {
		return {
			message: ''
		}
	},
	components: {},
	vuex: {
		getters: {
			channel: getChannel,
			channelPanel: getChannelPanel
		},
		actions: {
			sendMessage
		}
	},
	watch: {
		'channel.events': function() {
			this.$nextTick(() => {
				const container = this.$els.container
				if(container)
					helpers.letScrollTopEqualScrollHeight(container)
			})
		}
	},
	methods: {
		trySendMessage() {
			if(this.message.trim().length)
				this.sendMessage(this.message)
			this.message = ''
		}
	}
}
</script>

<style scoped>
	
</style>

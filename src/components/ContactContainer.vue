<template>

	<div v-if="contactSet && contact.ready" id="channel-messages">

		<div id="user-input">
			<div id="user-input-inner">
				<div id="user-input-container">
					<div id="user-upload">
						<span><i class="icon-share"></i></span>
					</div>
					<div id="user-message-input">
						<input id="contact_message" 
							v-model="message" 
							@keyup.enter="trySendMessage()"
							type="text" 
							placeholder="Chat with {{ contact.username }}..." 
							autocomplete="off">
						<span class="icon-grid"></span>
					</div>
				</div>
			</div>
		</div>

		<div v-el:container id="messages-container">
			<ul>
				<li v-for="event in contact.events">
					<div v-if="event.event_type == 'user_message'">
						<div class="message-username-container">
							<span class="username">{{ event.sender_username }}</span>
							<span class="timestamp">{{ event.created_at | formatTimestamp 'h:mma' }}</span>
						</div>
						<div>
							<span class="message">{{{ event.event_text }}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>

	</div>

</template>

<script>
import * as helpers from '../utils/helpers'
import { sendContactMessage } from '../vuex/contacts/actions'
import { getContact } from '../vuex/contacts/getters'
export default {
	data() {
		return {
			message: ''
		}
	},
	computed: {
		contactSet() {
			return !helpers.isEmptyObject(this.contact)
		}
	},
	vuex: {
		getters: {
			contact: getContact
		},
		actions: {
			sendContactMessage
		}
	},
	watch: {
		'contact.events': function () {
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
				this.sendContactMessage(this.message)
			this.message = ''
		}
	}
}
</script>

<style scoped>
	
</style>

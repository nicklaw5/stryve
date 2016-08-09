<template>

	<div v-if="contactSet && contact.ready" id="channel-messages">

		<div id="user-input" class='contacts'>
			<div id="user-input-inner">
				<div id="user-input-container">
					<div id="user-upload">
						<span><i class="icon-plus2"></i></span>
					</div>
					<div id="user-message-input">
						<textarea
              rows="1"
              v-model="message"
              autocomplete="off"
              id="contact_message"
              @keyup.enter="trySendMessage($event)"
              placeholder="Chat in {{ contact.username }}...">
            </textarea>
						<span class="icon-grid"></span>
					</div>
				</div>
			</div>
		</div>

		<div v-el:container id="messages-container" class="contacts">
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
import autogrow from 'textarea-autogrow'
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
		'contact.ready': function() {
      const textarea = document.getElementById('contact_message')
      if(textarea !== null) {
        this.autogrow = new autogrow(textarea, 8)
      }
    },
		'contact.events': function () {
			this.$nextTick(() => {
				const container = this.$els.container
				if(container)
					helpers.letScrollTopEqualScrollHeight(container)
			})
		}
	},
	methods: {
		trySendMessage(event) {
      if(event.keyCode == 13 && !event.shiftKey) {
      
        const emptyStringTest = this.message.replace(/\r?\n|\r/g, "");

        if(emptyStringTest.length) {

          if(this.message.trim().length) 
            this.sendContactMessage(this.message)

          this.message = ''
          document.getElementById('contact_message').style.height = '39px'
        }
      }
    }
	}
}
</script>

<style scoped>
	
</style>

<template>

  <div v-if="channel.ready" id="channel-messages">

    <div id="user-input">
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
              id="channel_message"
              @keyup.enter="trySendMessage($event)"
              placeholder="Chat in {{ channel.name }}..."></textarea>   
            <!-- <input id="channel_message" 
              v-model="message" 
              @keyup.enter="trySendMessage()"
              type="text" 
              placeholder="Chat in {{ channel.name }}..." 
              autocomplete="off"> -->
            <span class="icon-grid"></span>
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
import autogrow from 'textarea-autogrow'
import * as helpers from '../utils/helpers'
import { getChannel } from '../vuex/servers/getters'
import { getChannelPanel } from '../vuex/app/getters'
import { sendMessage } from '../vuex/servers/actions'

export default {
  data() {
    return {
      message: '',
      autogrow: {}
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
    'channel.ready': function() {
      const textarea = document.getElementById('channel_message')
      if(textarea !== null) {
        this.autogrow = new autogrow(textarea, 8)
      }
    },
    'channel.events': function() {
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
      
        let emptyStringTest = this.message.replace(/\r?\n|\r/g, "");

        if(emptyStringTest.length) {

          if(this.message.trim().length) 
            this.sendMessage(this.message)

          this.message = ''
          document.getElementById('channel_message').style.height = '39px'
        }
      }
    }
  }
}
</script>

<style scoped>
  
</style>

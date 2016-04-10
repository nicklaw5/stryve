<template>
	<div id="channel-messages-container">
		<div id="channel-messages-header-wrapper">
			<div id="channel-messages-header-left">
				<h3 v-show="chatChannelActive">
					<span class="hashtag">#</span><span class="channel">{{ chat_channel.name }}</span>
				</h3>				
			</div>

			<div id="channel-messages-header-right">
				<ul>
					<li @click="minimize()"><i class="icon-minus3"></i></li>
					<li @click="toggleMaximize()"><i class="icon-square-up-right" v-bind:class="{ 'icon-square-down-left': isMaximized }"></i></li>
					<li @click="logOutAndClose()"><i class="icon-cross2"></i></li>
				</ul>	
			</div>
		</div>

		<div id="channel-messages">
			<div v-show="chatChannelActive" id="user-input">
				<div id="user-input-inner">
					<div id="user-input-container">
						<div id="user-upload">
							<span><i class="icon-share"></i></span>
						</div>
						<div id="user-message-input">
							<input id="chat_message" v-model="chat_message" @keyup.enter="sendMessage()" type="text" placeholder="Chat in {{ chat_channel.name }}..." autocomplete="off">
							<span class="icon-grid"></span>
						</div>
					</div>
				</div>
			</div>
			<div id="messages-container">
				<ul>
					<li v-for="event in chat_channel.events">
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

		<div id="channel-users">
			<ul>
				<li>
					<div class="avatar">
						<span>{{ user.username | getFirstLetterUppercase }}</span>
					</div>
					<div class="username">{{ user.username }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return { }
	},
	created() {
		
	},
	vuex: {
		getters: {
			
		},
		actions: {
			
		}
	},
	methods: {
		
	}
}
</script>

<style scoped></style>

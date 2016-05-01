<template>
	<div id="c-search">
		<input type="text" @keyup="searchKeyUpEvent($event)" v-model="search" placeholder="Find or start a conversation">
		<span v-if="search.length" class="icon-x" @click="emptySearch()"></span>
		<span v-else class="icon-search4"></span>
	</div>

	<div v-if="haveContacts" id="channels-list">
		<ul>
			<li v-for="contact in contacts"
				:class="{ 'listening': contact.listening, 'active': contact.active }">
				<span class="channel-name" @click="">
					<span class="hashtag">@</span>{{ contact.username }}
				</span>
				<span class="icons">
					<i class="icon icon-cog7"></i>
				</span>
			</li>
		</ul>
	</div>

	<div v-else id="channels-list">
		<p>
			No contacts found.
		</p>
	</div>

</template>

<script>
import { getContacts } from '../vuex/contacts/getters'

export default {
	data() {
		return {
			search: ''
		}
	},
	vuex: {
		getters: {
			contacts: getContacts
		},
		actions: {
			
		}
	},
	computed: {
		haveContacts() {
			return Object.keys(this.contacts).length
		}
	},
	methods: {
		emptySearch() {
			this.search = ''
		},
		searchKeyUpEvent(event) {
			if(event.which === 13)
				console.log('enter hit')
			else if(event.which === 27)
				this.emptySearch()
		}
	}
}
</script>

<style scoped>
	.icon-x {
		cursor: pointer;
	}

	#channels-list p {
		padding: 14px 10px 8px 0px;
		text-align: center;
		font-size: 13px;
		font-weight: bold;
	}
</style>

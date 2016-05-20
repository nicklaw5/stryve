<template>
	<div id="c-search">
		<input type="text" @keyup="searchKeyUpEvent($event)" v-model="search" placeholder="Find or start a conversation">
		<span v-if="search.length" class="icon-x" @click="emptySearch()"></span>
		<span v-else class="icon-search4"></span>
	</div>

	<div v-if="!searching" id="contacts-list">
		<ul v-if="haveContacts">
			<li v-for="contact in pinnedContacts"
				:class="{ 'active': contact.active }">
				<span class="contact-name" @click="switchContacts(contact.uuid)">
					<span class="hashtag">@</span>{{ contact.username }}
				</span>
				<span class="icons">
					<!-- <i class="icon-cog7"></i> -->
					<i class="icon-circle-small online-status {{ contact.status }}"></i>
				</span>
			</li>
		</ul>
		<p v-else>You don't have any contacts.</p>
	</div>

	<div v-else id="contacts-list">
		<ul>
			<li v-for="contact in getSearchContacts">
				<span class="contact-name" @click="pinContact(contact.uuid)">
					<span class="hashtag">@</span>{{ contact.username }}
				</span>
				<span class="icons">
					<i class="icon-circle-small online-status {{ contact.status }}"></i>
					<a @click="pinContact(contact.uuid)">
						<i class="icon-radio-{{ (contact.is_contact)? 'checked' : 'unchecked' }}"></i>
					</a>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import * as helpers from '../utils/helpers'
import { getPinnedContacts, getSearching, getSearchContacts } from '../vuex/contacts/getters'
import { searchContacts, resetSearchContacts, switchContacts, togglePinnedContact } from '../vuex/contacts/actions'

export default {
	data() {
		return {
			search: ''
		}
	},
	computed: {
		haveContacts() {
			return Object.keys(this.pinnedContacts).length
		}
	},
	created() {
		helpers.updateTitleText('Contacts')
	},
	vuex: {
		getters: {
			searching: getSearching,
			pinnedContacts: getPinnedContacts,
			getSearchContacts: getSearchContacts
		},
		actions: {
			switchContacts,
			searchContacts,
			resetSearchContacts,
			togglePinnedContact
		}
	},
	watch: {
		
	},
	methods: {
		emptySearch() {
			this.search = ''
			this.resetSearchContacts()
		},
		pinContact(contact_uuid) {
			this.togglePinnedContact(contact_uuid)
		},
		searchKeyUpEvent(event) {
			if(event.which === 13 && this.search.length) 			// 'enter' key
				this.searchContacts(this.search)
			else if(event.which === 27 || !this.search.length && event.which !== 13) 	// 'esc' key
				this.emptySearch()
		},
	}
}
</script>

<style scoped>
	.icon-x {
		cursor: pointer;
	}

	#contacts-list p {
		padding: 14px 10px 8px 0px;
		text-align: center;
		font-size: 13px;
		font-weight: bold;
	}
</style>

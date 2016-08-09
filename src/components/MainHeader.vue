<template>
	<div id="channel-messages-header-wrapper">
		<div id="channel-messages-header-left">
			<h3>
				<div v-if="channelPanel == 'contacts'">
					<div v-if="contactSet">
						<span class="hashtag">@
						</span><span class="channel">{{ contact.username }}</span>
					</div>
				</div>
				<div v-else>
					<div v-if="channelSet">
						<span class="hashtag">#</span>
						<span class="channel">{{ channel.name }}</span>
					</div>
				</div>
			</h3>
		</div>

		<div id="release-tag">
			<span>{{ pkg.version }}</span>
		</div>
	</div>
</template>

<script>
import pkg from '../../package.json'
import * as helpers from '../utils/helpers'
import { getChannel } from '../vuex/servers/getters'
import { getContact } from '../vuex/contacts/getters'
import { getChannelPanel } from '../vuex/app/getters'

export default {
	data() {
		return {
			pkg: pkg
		}
	},
	props: ['channel'],
	computed: {
		contactSet() {
			return !helpers.isEmptyObject(this.contact)
		},
		channelSet() {
			return !helpers.isEmptyObject(this.channel)
		}
	},
	vuex: {
		getters: {
			channel: getChannel,
			contact: getContact,
			channelPanel: getChannelPanel
		}
	}
}
</script>

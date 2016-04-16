<template>
	<div id="user-settings">
		<div id="user-settings-inner">
			<div class="avatar">
				<span>{{ user.username | capitalizeFirstLetter }}</span>
			</div>
			<div class="username">{{ user.username }}</div>
			<ul class="icons">
				<li>
					<i class="icon-move-left"
						@click="attemptUserLogout()"
						@mouseover="showLogOutTooltip($event)"
						@mouseleave="hideTooltips()">
					</i>
				</li>
				<li>
					<i class="icon-cog7"
						@mouseover="showSettingsTooltip($event)"
						@mouseleave="hideTooltips()">
					</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getUser } from '../vuex/users/getters'
import { attemptUserLogout } from '../vuex/auth/actions'

export default {
	vuex: {
		getters: {
			user: getUser
		},
		actions: {
			attemptUserLogout
		}
	}
}
</script>

<style scoped></style>

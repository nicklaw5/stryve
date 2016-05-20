<template>
	<div id="user-settings">
		<div id="user-settings-inner">
			<div class="avatar">
				<span>{{ user.username | capitalizeFirstLetter }}</span>
			</div>
			<div class="username">{{ user.username }}</div>
			<ul class="icons">
				<li @click="attemptUserLogout()">
					<i class="icon-move-left"
						@mouseover="showLogOutTooltip($event)"
						@mouseleave="hideTooltips()">
					</i>
				</li>
				<!-- <li>
					<i class="icon-cog7"
						@mouseover="showSettingsTooltip($event)"
						@mouseleave="hideTooltips()">
					</i>
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
import { getUser } from '../vuex/users/getters'
import { hideTooltips } from '../utils/helpers'
import { attemptUserLogout } from '../vuex/auth/actions'
export default {
	vuex: {
		getters: {
			user: getUser
		},
		actions: {
			hideTooltips,
			attemptUserLogout
		}
	},
	methods: {
		showLogOutTooltip: event => {
			// set top and left attributes
			var offsetTop = event.target.offsetTop
							+ event.target.parentElement.offsetTop
							+ event.target.parentElement.parentElement.offsetTop
							+ event.target.parentElement.parentElement.parentElement.offsetTop
							+ (event.target.parentElement.parentElement.parentElement.parentElement.offsetTop - 60);

			var offsetLeft = 80 + 190;

			// create the tooltip
			var tooltip = document.createElement('span');
			tooltip.style.cssText = 'position:fixed;top:'+offsetTop+'px;left:'+offsetLeft+'px;z-index:999;';
			tooltip.className += ' tooltip';
			tooltip.innerHTML = 'Log Out';

			// create the tringle pointer
			var tooltip_pointer = document.createElement('span');
			tooltip_pointer.style.cssText = 'position:fixed;top:'+(offsetTop + 20)+'px;left:'+(offsetLeft + 22)+'px;z-index:999;';
			tooltip_pointer.className += ' tooltip-pointer tooltip-pointer-down';
			
			// insert both the tooltip and pointer
			document.body.appendChild(tooltip);
			document.body.appendChild(tooltip_pointer);
		},
		showSettingsTooltip: event => {
			// set top and left attributes
			var offsetTop = event.target.offsetTop
							+ event.target.parentElement.offsetTop
							+ event.target.parentElement.parentElement.offsetTop
							+ event.target.parentElement.parentElement.parentElement.offsetTop
							+ (event.target.parentElement.parentElement.parentElement.parentElement.offsetTop - 60);
			var offsetLeft = 80 + 170;

			// create the tooltip
			var tooltip = document.createElement('span');
			tooltip.style.cssText = 'position:fixed;top:'+offsetTop+'px;left:'+offsetLeft+'px;z-index:999;';
			tooltip.className += ' tooltip';
			tooltip.innerHTML = 'User Settings';

			// create the tringle pointer
			var tooltip_pointer = document.createElement('span');
			tooltip_pointer.style.cssText = 'position:fixed;top:'+(offsetTop + 20)+'px;left:'+(offsetLeft + 40)+'px;z-index:999;';
			tooltip_pointer.className += ' tooltip-pointer tooltip-pointer-down';
			
			// insert both the tooltip and pointer
			document.body.appendChild(tooltip);
			document.body.appendChild(tooltip_pointer);
		},
	}
}
</script>

<style scoped></style>

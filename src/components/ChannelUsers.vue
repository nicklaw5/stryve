<template>
	<div id="channel-users">
		<ul>
			<li>
				<div class="avatar">
					<span>{{ 'Jimbo' | capitalizeFirstLetter }}</span>
				</div>
				<div class="username">{{ 'Jimbo' }}</div>
			</li>
			<li>
				<div class="avatar">
					<span>{{ 'Nick' | capitalizeFirstLetter }}</span>
				</div>
				<div class="username">{{ 'Nick' }}</div>
			</li>
			<li>
				<div class="avatar">
					<span>{{ 'Mary' | capitalizeFirstLetter }}</span>
				</div>
				<div class="username">{{ 'Mary' }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
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

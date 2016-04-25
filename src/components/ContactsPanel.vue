<template>
	<div id="c-search">
		<input type="text" v-model="search" placeholder="Find or start a conversation">
		<span class="icon-search4"></span>
	</div>

	<div id="channels-list">
		<p>
			Direct Chat Coming Soon
		</p>
	</div>

</template>

<script>
export default {
	data() {
		return {
			search: ''
		}
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

<style scoped>
	#channels-list p {
		padding: 14px 10px 8px 0px;
		text-align: center;
		font-size: 13px;
		font-weight: bold;
	}
</style>

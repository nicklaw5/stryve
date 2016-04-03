<template>
	<div>
		<h1>{{msg}}</h1>
	</div>
</template>

<script>
import store from '../vuex/store'

export default {
	data() {
		return {
			store: store.state,
		    msg: 'Login'
		}
	}
}
</script>

<style scoped>
h1 {
	color: green;
}
</style>

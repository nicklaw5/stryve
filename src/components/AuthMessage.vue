<template>
	<div v-if="message.message.length">
		<p class="text-{{ message.tone }} text-center">{{ message.message }}</p>
		<br>
	</div>
</template>

<script>
export default {
	props: ['message']
}
</script>
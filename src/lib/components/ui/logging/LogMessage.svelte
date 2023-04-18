<script lang="ts">
    export let message = "Hello World";
    export let timestamp = '';
</script>

<div class="message">
	{timestamp} {message}
</div>

<style>
	.message {
		background-color: var(--color-secondary);
		padding: 2px 1px 1px;
		line-height: 7px;
	}
</style>
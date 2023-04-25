<script lang="ts">
    export let message = "Hello World";
    export let timestamp = '';
</script>

<div class="message">
	{timestamp} {message}
</div>

<style>
	.message {
		background-color: var(--color-background);
		padding: 1px 1px 0;
		line-height: 5px;
		word-break: break-word;
	}
</style>
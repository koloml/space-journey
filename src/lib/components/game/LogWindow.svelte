<script lang="ts">
    import {type LogEntry, logsStore} from "@/lib/storage/LogsStore";
    import LogMessage from "@/lib/components/game/logging/LogMessage.svelte";

    let logMessages: LogEntry[] = [];

    logsStore.subscribe(messages => {
        logMessages = messages;
    });
</script>

<div class="logs">
	{#each logMessages as message}
		<LogMessage message={message.text} timestamp={message.timestamp}/>
	{/each}
</div>

<style>
    .logs {
        font-family: LazyFox7, serif;
		font-size: 5px;
		display: flex;
		flex-direction: column-reverse;
    }

	.logs > :global(.message:nth-child(2n)) {
		background-color: var(--color-secondary-dark);
	}
</style>
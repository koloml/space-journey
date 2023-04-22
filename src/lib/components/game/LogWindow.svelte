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
        overflow-y: auto;
        padding: 1px;
        font-family: LazyFox7, serif;
		font-size: 8px;
    }
</style>
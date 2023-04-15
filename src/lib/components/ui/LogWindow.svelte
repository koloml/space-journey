<script lang="ts">
    import {type LogEntry, logsStore} from "@/lib/storage/LogsStore";
    import LogMessage from "@/lib/components/ui/logging/LogMessage.svelte";

    let logMessages: LogEntry[] = [];

    logsStore.subscribe(messages => {
        logMessages = messages;
    });
</script>

<nav>
	<div>Logs</div>
	{#each logMessages as message}
		<LogMessage message="{message.text}" timestamp="{message.timestamp}"></LogMessage>
	{/each}
</nav>

<style>
    nav {
		display: flex;
		flex-direction: column;
		line-height: 7px;
    }
</style>
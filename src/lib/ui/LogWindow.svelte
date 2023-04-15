<script lang="ts">
    import {type LogEntry, logsStore} from "../storage/logs";
    import LogMessage from "./logging/LogMessage.svelte";

    let logMessages: LogEntry[] = [];

    logsStore.subscribe(messages => {
        console.log(messages);

        logMessages = messages;
    });
</script>

<nav>
	<div>Logs</div>
	{#each logMessages as message}
		<LogMessage message="{message.text}" timestamp="{message.timestamp}"></LogMessage>
	{/each}
</nav>
<script lang="ts">
    import {type LogEntry, logsStore} from "@/lib/storage/logs";
    import LogMessage from "@/lib/components/ui/logging/LogMessage.svelte";
    import {getContext} from "svelte";
    import type Game from "@/lib/game/Game";

    let logMessages: LogEntry[] = [];

    logsStore.subscribe(messages => {
        console.log(messages);

        logMessages = messages;
    });

    const game = getContext<Game>('game');
</script>

<nav>
	<div>Logs</div>
	{#each logMessages as message}
		<LogMessage message="{message.text}" timestamp="{message.timestamp}"></LogMessage>
	{/each}
</nav>
<script lang="ts">
    import {activeDecisionStore} from "@/lib/storage/ActiveDecisionStore";
    import type GameEvent from "@/lib/game/events/entities/GameEvent";
    import DecisionBlock from "@/lib/components/game/decisions/DecisionBlock.svelte";

    let decision: GameEvent | null = null;

    activeDecisionStore.subscribe(store => {
        decision = store.decision;
    });
</script>

{#if decision}
	<DecisionBlock bind:event={decision}></DecisionBlock>
{/if}

<style>
    .decisions {
        display: grid;
    }
</style>
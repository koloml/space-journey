<script lang="ts">
    import type GameEvent from "@/lib/game/events/entities/GameEvent";
    import DecisionChoice from "@/lib/components/game/decisions/DecisionChoice.svelte";

    export let event: GameEvent;
</script>

{#if event}
	<div class="decision">
		<div class="text">{event.text}</div>
		<div class="choices">
			{#each event.choices as choice}
				<DecisionChoice choice={choice}/>
			{/each}
		</div>
	</div>
{/if}

<style>
    .decision {
		border-top: 1px solid var(--color-secondary);
        font-family: LazyFox7, serif;
        font-size: 8px;
        line-height: 7px;
        margin: 1px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .choices {
        display: flex;
        gap: 2px;
        flex-wrap: wrap;
    }


    .text {
        padding: 3px 2px 0;
        position: relative;
        text-align: center;
        border-color: var(--color-secondary);
    }

    .text {
        border-color: var(--color-primary);
    }
</style>
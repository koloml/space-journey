<script lang="ts">
    import type GameEvent from "@/lib/game/events/entities/GameEvent";

    export let event: GameEvent;
</script>

{#if event}
	<div class="decision">
		<div class="text">{event.text}</div>
		<div class="choices">
			{#each event.choices as choice}
				<div class="choice" on:click={() => choice.execute()}>{choice.text}</div>
			{/each}
		</div>
	</div>
{/if}

<style>
    .decision {
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

	.choice {
		flex-grow: 1;
	}

    .text, .choice {
        padding: 3px 2px 2px;
        position: relative;
        text-align: center;
		border-color: var(--color-secondary);
    }

	.text {
		border-color: var(--color-primary);
	}

    .text::before, .text::after, .choice::before, .choice::after {
        content: "";
        display: block;
        border-color: inherit;
        border-style: solid;
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
    }

    .text::before, .choice::before {
        top: 0;
        border-width: 1px 1px 0 1px;
    }

    .text::after, .choice::after {
        bottom: 0;
        border-width: 0 1px 1px 1px;
    }
</style>
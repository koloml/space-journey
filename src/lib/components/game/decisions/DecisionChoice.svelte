<script lang="ts">
    import type GameEventChoice from "@/lib/game/events/entities/GameEventChoice";

    export let choice: GameEventChoice;
</script>

<div class="choice" on:click={() => choice.execute()}>{choice.text}</div>

<style>
    .choice {
        flex-grow: 1;
        padding: 2px 2px 0;
        position: relative;
        text-align: center;
        border-color: var(--color-secondary);
		border: 1px solid var(--color-secondary);
		cursor: pointer;
    }

	.choice:hover {
		border-color: var(--color-primary);
        color: var(--color-primary-bright);
	}
</style>
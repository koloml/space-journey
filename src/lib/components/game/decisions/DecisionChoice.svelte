<script lang="ts">
    import type GameEventChoice from "@/lib/game/events/entities/GameEventChoice";

    export let choice: GameEventChoice;
</script>

<div class="choice" on:click={() => choice.execute()}>{choice.text}</div>

<style>
    .choice {
        flex-grow: 1;
        padding: 3px 2px 2px;
        position: relative;
        text-align: center;
        border-color: var(--color-secondary);
    }

    .choice::before, .choice::after {
        content: "";
        display: block;
        border-color: inherit;
        border-style: solid;
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
    }

    .choice::before {
        top: 0;
        border-width: 1px 1px 0 1px;
    }

    .choice::after {
        bottom: 0;
        border-width: 0 1px 1px 1px;
    }
</style>
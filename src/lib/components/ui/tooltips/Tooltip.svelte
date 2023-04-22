<script lang="ts">
    import resourceArrowUrl from "@/assets/images/tooltips/resources.png";
    import systemArrowUrl from "@/assets/images/tooltips/system.png";
    import energyArrowUrl from "@/assets/images/tooltips/energy.png";
    import journeyArrowUrl from "@/assets/images/tooltips/journey_progress.png";

    export let position: string;
    export let pointer: string;

    let pointerUrl = '';

    $: switch (position) {
        case "right":
            switch (pointer) {
                case "resource":
                    pointerUrl = resourceArrowUrl;
                    break;
                case "system":
                    pointerUrl = systemArrowUrl;
                    break;
                case "energy":
                    pointerUrl = energyArrowUrl;
                    break;
            }
            break;

        case "bottom":
            switch (pointer) {
                case "journey":
                    pointerUrl = journeyArrowUrl;
                    break;
            }
    }
</script>

<div class="tooltip {position}">
	{#if (position === 'right' || position === 'bottom') && pointerUrl}
		<img src={pointerUrl} alt="arrow">
	{/if}
	<slot></slot>
</div>

<style>
    .tooltip {
        position: absolute;
        display: none;
        font-family: LazyFox7, serif;
        font-size: 8px;
        line-height: 8px;
        background-color: var(--color-background);
        padding: 1px 0 1px 0;
		z-index: 3;
    }

    .tooltip.right {
        left: 100%;
        top: 0;
        bottom: 0;
    }

	.tooltip.bottom {
		flex-direction: column;
		align-items: center;
		top: 100%;
		left: 0;
		right: 0;
	}

    :global(.activator:hover) .tooltip {
        display: flex;
        align-items: center;
    }
</style>
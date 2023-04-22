<script lang="ts">
    import progressArrowUrl from "@/assets/images/journey-progress/progress-arrow.png";
    import planetIconUrl from "@/assets/images/journey-progress/planet.png";
    import TooltipActivator from "@/lib/components/ui/tooltips/TooltipActivator.svelte";
    import Tooltip from "@/lib/components/ui/tooltips/Tooltip.svelte";

    export let value = 0;
    export let max = 0;

    $: progress = value / max;
    $: progressPercent = Math.round(progress * 100);
</script>

<TooltipActivator>
	<div class="progress">
		<img src="{planetIconUrl}" alt="Departure" class="planet start">
		<div class="bar">
			<div class="full"></div>
			<div class="current" style="width: {progressPercent}%">
				<img src="{progressArrowUrl}" alt="Progress">
				<Tooltip position="bottom" pointer="journey">{value.toFixed(2)} Ly</Tooltip>
			</div>
		</div>
		<img src="{planetIconUrl}" alt="Destination" class="planet target">
	</div>
</TooltipActivator>

<style>
    .progress {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-gap: 1px;
        align-items: center;
        grid-column: 1 / end;
    }

    .bar {
        position: relative;
        height: 5px;
        display: flex;
        padding: 1px;
    }

    .bar:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: -1px;
        bottom: -1px;
        width: 1px;
        background-color: var(--color-primary);
        border: 1px solid var(--color-background);
        z-index: 1;
    }

    .full {
        position: absolute;
        height: 3px;
        background: var(--color-secondary);
        top: 2px;
        left: 3px;
        right: 0;
        z-index: -1;
        border: 1px solid var(--color-background);
        margin: -1px 0;
    }

    .current {
        background: var(--color-primary);
        position: relative;
        border: 1px solid var(--color-background);
        margin: -1px 0;
        min-width: 4px;
    }

    .current img {
        position: absolute;
        right: -3px;
        top: -2px;
        z-index: 2;
    }

	.current :global(.tooltip.bottom) {
		right: 0;
		left: unset;
		width: max-content;
		transform: translateX(50%);
		padding: 0 0 0 1px;
		top: 100%;
		margin-top: 4px;
	}

	.current :global(.tooltip.bottom img) {
		position: absolute;
		top: -3px;
	}

    .planet {
        width: 9px;
        height: 9px;
        object-fit: cover;
        object-position: left;
    }

    .planet.target {
        object-position: right;
    }


</style>
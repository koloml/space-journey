<script lang="ts">
    import progressArrowUrl from "@/assets/images/journey-progress/progress-arrow.png";
    import planetIconUrl from "@/assets/images/journey-progress/planet.png";

    export let value = 0;
    export let max = 0;

    $: progress = value / max;
    $: progressPercent = Math.round(progress * 100);
</script>

<div class="progress">
	<img src="{planetIconUrl}" alt="Departure" class="planet start">
	<div class="bar">
		<div class="full"></div>
		<div class="current" style="width: {progressPercent}%">
			<img src="{progressArrowUrl}" alt="Progress">
		</div>
	</div>
	<img src="{planetIconUrl}" alt="Destination" class="planet target">
</div>

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
        border-left: 1px solid var(--color-primary);
    }

    .full {
        position: absolute;
        height: 1px;
        background: var(--color-secondary);
        top: 2px;
        left: 3px;
        right: 0;
        z-index: -1;
    }

    .current {
        background: var(--color-primary);
        position: relative;
    }

    .current img {
        position: absolute;
        right: -3px;
        top: -2px;
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
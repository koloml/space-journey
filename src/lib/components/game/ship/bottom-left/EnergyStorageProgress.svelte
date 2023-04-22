<script lang="ts">
    import energyBarIconUrl from "@/assets/images/energy-bar/energy.png";
    import segmentUrl from "@/assets/images/energy-bar/segment.png";

    export let value: number;
    export let max: number = 16;

    $: barStyle = `--icon-url: url(${segmentUrl}); --value: ${value}; --max: ${max};`;
</script>

<div class="progress">
	<img src="{energyBarIconUrl}" alt="Energy">
	<div class="bar" style="{barStyle}">
		<div class="current"></div>
	</div>
</div>

<style>
    .progress {
        display: flex;
        height: 7px;
    }

    .bar {
		--value: 0;
		--max: 16;

        position: relative;
        width: calc(3px * var(--max) + 1px);
		border-left: 1px solid var(--color-background);
		margin-left: -1px;
    }

    .current {
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        width: calc(3px * var(--value) - 1px);
        background-position-y: bottom;
    }

    .bar, .current {
        --icon-url: unset;

        background-image: var(--icon-url);
        height: 7px;
    }
</style>
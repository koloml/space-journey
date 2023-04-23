<script lang="ts">
    import plusIconUrl from "@/assets/images/plus.png";
    import segmentIconUrl from "@/assets/images/sub-systems/segment.png";
    import TooltipActivator from "@/lib/components/ui/tooltips/TooltipActivator.svelte";
    import Tooltip from "@/lib/components/ui/tooltips/Tooltip.svelte";

    export let icon: string;
    export let value: number;
    export let max = 2;
	export let hint: string;

    let systemIconUrl = new URL(`/src/assets/images/sub-systems/${icon}.png`, import.meta.url);

    $: plusIconClassList = value >= max ? " disabled" : "";
    $: plusIconStyle = `background-image: url(${plusIconUrl})`;
    $: barStyle = `--value: ${value}; --max: ${max}; background-image: url(${segmentIconUrl})`;
    $: systemIconClassList = value > 0 ? "active" : "";
</script>

<TooltipActivator>
	<div class="control">
		<div class="progress">
			<div class="plus{plusIconClassList}" style="{plusIconStyle}"
				 on:click={() => value = Math.min(++value, max)}></div>
			<div class="bar" style="{barStyle}">
				<div class="current"></div>
			</div>
		</div>
		<img src="{systemIconUrl}" alt="{icon}" class="{systemIconClassList}">
	</div>
	<Tooltip position="top-right" pointer="upgrades">{hint}</Tooltip>
</TooltipActivator>

<style>
    .control img {
        width: 9px;
        height: 9px;
        object-fit: cover;
        object-position: left;
    }

    .control img.active {
        object-position: right;
    }

    .progress {
        display: flex;
        gap: 1px;
        align-items: flex-end;
    }

    .plus {
        background-position-x: left;
        width: 5px;
        height: 5px;
        cursor: pointer;
        margin-right: -2px;
    }

    .plus:hover {
        background-position-x: right;
    }

    .plus.disabled {
        opacity: 0;
        cursor: initial;
        pointer-events: none;
    }

    .bar {
        --value: 0;
        --max: 2;

        position: relative;
        background-position: bottom left;
        background-repeat: repeat-y;
        width: 5px;
        height: calc(3px * var(--max) + 1px);
        border-bottom: 1px solid var(--color-background);
        background-color: var(--color-background);
        margin-bottom: -1px;
    }

    .current {
        background-image: inherit;
        background-position: bottom right;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: calc(3px * var(--value) - 1px);
    }

	.control + :global(.tooltip) {
		width: max-content;
	}
</style>
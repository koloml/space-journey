<script lang="ts">
    import minusIconUrl from '@/assets/images/minus.png';
    import plusIconUrl from '@/assets/images/plus.png';
    import systemSegmentUrl from "@/assets/images/systems/segment.png"
    import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";
    import TooltipActivator from "@/lib/components/ui/tooltips/TooltipActivator.svelte";
    import Tooltip from "@/lib/components/ui/tooltips/Tooltip.svelte";

    export let value: number;
    export let max = 2;
    export let system: string;
    export let hint: string;
    export let active: boolean = true;
    export let repairable: boolean = true;
    export let cost: Partial<ResourcesInfo>;

    $: minusClassList = value > 0 && active ? 'minus' : 'minus disabled';
    $: plusClassList = value < max && active ? 'plus' : 'plus disabled';
    $: minusStyle = `--icon-url: url(${minusIconUrl})`;
    $: plusStyle = `--icon-url: url(${plusIconUrl})`;
    $: segmentStyle = `--icon-url: url(${systemSegmentUrl})`;

    let systemIconUrl = new URL(`/src/assets/images/systems/${system}.png`, import.meta.url);
</script>

<TooltipActivator>
	<div class="control">
		<div class="{minusClassList}" style="{minusStyle}" on:click="{() => (value = Math.max(--value, 0))}"></div>
		<div class="state" style="{segmentStyle}">
			<div class="full" style="--width: {max}"></div>
			<div class="current" style="--width: {value}"></div>
			<img src="{systemIconUrl}" alt="{system}" class="{value === 0 ? 'disabled' : ''}">
		</div>
		<div class="{plusClassList}" style="{plusStyle}" on:click="{() => (value = Math.min(++value, max))}"></div>
	</div>
	<Tooltip pointer="arrow" position="right">{system}</Tooltip>
</TooltipActivator>

<style>
    .control {
        display: flex;
        align-items: flex-end;
    }

    .state {
        height: 3px;
        position: relative;
        margin-left: 2px;
    }

    .full {
        width: calc(3px * (var(--width) + 1) - 1px);
    }

    .current {
        width: calc(3px * (var(--width)) - 1px);
        background-position-y: bottom;
        position: absolute;
        left: 3px;
        top: 0;
    }

    .full, .current {
        --icon-url: unset;

        background-image: var(--icon-url);
        background-repeat: repeat-x;
        background-position-x: 3px;
        margin: -1px 0;
        height: 5px;
    }

    .state img {
        position: absolute;
        bottom: 0;
        left: -2px;
        width: 7px;
        height: 7px;
        object-fit: cover;
        object-position: right;
        margin: -1px;
    }

    .state img.disabled {
        object-position: left;
    }

    .minus, .plus {
        --icon-url: unset;

        width: 5px;
        height: 5px;
        background-image: var(--icon-url);
        background-position-x: 0;
        cursor: pointer;
        margin: -1px 0;
    }

    .minus:hover, .plus:hover {
        background-position-x: 5px;
    }

    .minus.disabled, .plus.disabled {
        opacity: 0;
        cursor: initial;
        pointer-events: none;
    }
</style>
<script lang="ts">
    import minusIconUrl from '@/assets/images/minus.png';
    import plusIconUrl from '@/assets/images/plus.png';
    import repairIconUrl from '@/assets/images/systems/repair.png';
    import systemSegmentUrl from "@/assets/images/systems/segment.png"
    import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";
    import {resourcesStore} from "@/lib/storage/ResourcesStore";
    import TooltipActivator from "@/lib/components/ui/tooltips/TooltipActivator.svelte";
    import Tooltip from "@/lib/components/ui/tooltips/Tooltip.svelte";
    import {getContext} from "svelte";
    import type Game from "@/lib/game/Game";
    import type {SystemsStatusInfo} from "@/lib/storage/SystemsStatusStore";

    export let value: number;
    export let max = 2;
    export let icon: string;
    export let system: keyof SystemsStatusInfo;
    export let hint: string;
    export let active: boolean = true;
    export let repairable: boolean = true;
    export let cost: Partial<ResourcesInfo> = {};
    export let available: number;

    const game: Game = getContext('game');

    let resources;

    resourcesStore.subscribe(store => resources = store);

    $: haveSpareEnergy = available > 0;

    $: minusClassList = value > 0 && active ? 'minus' : 'minus disabled';
    $: plusClassList = value < max && active && haveSpareEnergy ? 'plus' : 'plus disabled';
    $: minusStyle = `--icon-url: url(${minusIconUrl})`;
    $: plusStyle = `--icon-url: url(${plusIconUrl})`;
    $: segmentStyle = `--icon-url: url(${systemSegmentUrl})`;
    $: repairStyle = `--icon-url: url(${repairIconUrl})`;

    $: haveNoCost = repairable && !Object.values(cost).length;
    $: haveResources = haveNoCost || Object.entries(cost).every(([resource, cost]) => resources[resource] >= cost);
    $: canBeRepaired = repairable && haveResources;

    $: stateDestoryedClassName = !active ? 'destroyed' : '';

    let systemIconUrl = new URL(`/src/assets/images/systems/${icon}.png`, import.meta.url);

    function requestRepair() {
        if (canBeRepaired) {
            game.systems
                .repair(system)
                .save();

            game.resources
                .save();
        }
    }
</script>

<TooltipActivator>
	<div class="control">
		{#if !active && canBeRepaired}
			<div class="repair" style={repairStyle} on:click={requestRepair}></div>
		{/if}
		<div class="{minusClassList}" style="{minusStyle}" on:click="{() => (value = Math.max(--value, 0))}"></div>
		<div class="state {stateDestoryedClassName}" style="{segmentStyle}">
			<div class="full" style="--width: {max}"></div>
			<div class="current" style="--width: {value}"></div>
			<img src="{systemIconUrl}" alt="{icon}" class="{(value === 0 || !active) ? 'disabled' : ''}">
			{#if !active}
				<div class="strike"></div>
			{/if}
		</div>
		<div class="{plusClassList}" style="{plusStyle}" on:click="{() => (value = Math.min(++value, max))}"></div>
	</div>
	<Tooltip pointer="system" position="right">{icon}</Tooltip>
</TooltipActivator>

<style>
    .control {
        display: flex;
        align-items: flex-end;
    }

    .control + :global(.tooltip) {
        height: 6px;
    }

    .state {
        height: 3px;
        position: relative;
        margin-left: 2px;
    }

    .full {
        width: calc(3px * (var(--width) + 1));
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

    .state.destroyed .strike {
        position: absolute;
        content: '';
        display: block;
        height: 3px;
        background-color: var(--color-background);
        top: -1px;
        left: -3px;
        right: 0;
        padding: 1px;
    }

    .strike:after {
        content: '';
        display: block;
        height: 1px;
        background-color: var(--color-secondary);
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

    .repair {
        --icon-url: unset;

        cursor: pointer;
        background-image: var(--icon-url);
        width: 5px;
        height: 7px;
        background-repeat: no-repeat;
        position: absolute;
        bottom: -1px;
        z-index: 3;
    }

    .repair:hover {
        background-position-x: right;
    }
</style>
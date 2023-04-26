<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import SystemEnergyControl from "@/lib/components/game/ship/bottom-left/SystemEnergyControl.svelte";
    import EnergyProductionProgress from "@/lib/components/game/ship/bottom-left/EnergyProductionProgress.svelte";
    import EnergyStorageProgress from "@/lib/components/game/ship/bottom-left/EnergyStorageProgress.svelte";
    import SystemUpgradeControl from "@/lib/components/game/ship/bottom-right/SystemUpgradeControl.svelte";
    import JourneyProgress from "@/lib/components/game/ship/top/JourneyProgress.svelte";
    import ResourceAmountCounter from "@/lib/components/game/ship/top/ResourceAmountCounter.svelte";
    import {type SubSystemsUpgradesInfo, subSystemsUpgradesStore} from "@/lib/storage/SubSystemsUpgradesStore";
    import {type TotalEnergyInfo, totalEnergyStore} from "@/lib/storage/TotalEnergyStore";
    import {type ResourcesInfo, resourcesStore} from "@/lib/storage/ResourcesStore";
    import {type JourneyProgressInfo, journeyProgressStore} from "@/lib/storage/JourneyProgressStore";
    import {type SystemsStatusInfo, systemsStatusStore, type SystemStatus} from "@/lib/storage/SystemsStatusStore";
    import {type ActiveZoneInfo, activeZoneStore} from "@/lib/storage/ActiveZoneStore";
    import {type ActiveDecisionInfo, activeDecisionStore} from "@/lib/storage/ActiveDecisionStore";
    import spaceLayerUrl from "@/assets/images/background/layer-1.png";
    import cloudsLayerUrl from "@/assets/images/background/layer-2.png";
    import frontStarsLayerUrl from "@/assets/images/background/layer-3.png";
    import pauseIconUrl from "@/assets/images/pause.png";

    let systemsStatusInfo: SystemsStatusInfo;
    let systemUpgradesInfo: SubSystemsUpgradesInfo;
    let totalEnergyInfo: TotalEnergyInfo;
    let resourcesInfo: ResourcesInfo;
    let journeyInfo: JourneyProgressInfo;
    let zoneInfo: ActiveZoneInfo;
    let eventInfo: ActiveDecisionInfo;

    /**
     * We're using the LittleJS engine which is always creates a canvas element in the root of the document. We need to
     * move these canvases over there.
     */
    function moveCanvasFromRoot() {
        document.getElementById('ship-canvas').append(
            mainCanvas,
            overlayCanvas,
            glCanvas
        )
    }

    let locationHash = window.location.hash;

    function refreshHash() {
        locationHash = window.location.hash;
    }

    onMount(() => {
        // LittleJS is using a global variable to store the image of the tileset. Sadly, they're not typed this variable
        // correctly in typedef file, so we need to cast it to HTMLImageElement.
        if (!(tileImage instanceof HTMLImageElement)) {
            throw new Error("Something wrong happen with the tile image!");
        }

        // If image is already loaded, we can move them immediately.
        if (tileImage.complete) {
            moveCanvasFromRoot();
            return;
        }

        // Wait for tileset to load or fail. Only after the image is loaded or failed to load, canvases are being
        // created in DOM by the engine.
        tileImage.addEventListener('load', moveCanvasFromRoot);
        tileImage.addEventListener('error', moveCanvasFromRoot);

        window.addEventListener('hashchange', refreshHash);
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', refreshHash);
    });

    systemsStatusStore.subscribe(storage => systemsStatusInfo = storage);
    subSystemsUpgradesStore.subscribe(storage => systemUpgradesInfo = storage);
    totalEnergyStore.subscribe(storage => totalEnergyInfo = storage);
    resourcesStore.subscribe(storage => resourcesInfo = storage);
    journeyProgressStore.subscribe(storage => journeyInfo = storage);
    activeZoneStore.subscribe(storage => zoneInfo = storage);
    activeDecisionStore.subscribe(storage => eventInfo = storage);

    // Calculating the energy consumption & total amount of available energy
    $: totalEnergyUsedByUpgrades = Object
        .values(systemUpgradesInfo)
        .reduce((sumEnergy: number, energy: number) => sumEnergy + energy, 0);
    $: totalEnergyUsedBySystems = Object
        .values(systemsStatusInfo)
        .reduce((sumEnergy: number, system: SystemStatus) => sumEnergy + system.energy, 0);
    $: freeEnergyAvailable = totalEnergyInfo.totalEnergy - totalEnergyUsedByUpgrades - totalEnergyUsedBySystems;

    // Updating the store every time they're changed by the UI
    $: systemsStatusStore.set(systemsStatusInfo);
    $: subSystemsUpgradesStore.set(systemUpgradesInfo);
    $: totalEnergyStore.set(totalEnergyInfo);
    $: resourcesStore.set(resourcesInfo);

    $: zoneBackgroundStyle = zoneInfo.zone
        ? zoneInfo.zone.background
            .slice(0, Math.min(2, zoneInfo.zone.background.length))
            .map((url, index) => `--zone-layer-${index}: url(${url})`)
            .join('')
        : '';
    $: zoneShiftRates = zoneInfo.zone
        ? zoneInfo.zone.backgroundShitRates
            .slice(0, Math.min(2, zoneInfo.zone.background.length))
            .map((rate, index) => `--zone-shift-${index}: ${rate}`)
            .join('')
        : '';
    $: canvasBackgroundStyle =
        `--space-layer: url(${spaceLayerUrl});` +
        `--clouds-layer: url(${cloudsLayerUrl});` +
        `--front-stars-layer: url(${frontStarsLayerUrl});`;
    $: canvasShiftStyle = `--shift: ${journeyInfo.traveled.toFixed(2)}px;`;
    $: resultShipCanvasStyle = `${canvasBackgroundStyle} ${canvasShiftStyle} ${zoneBackgroundStyle}`;
    $: isPaused = eventInfo.decision !== null && locationHash === '#game';

    $: systemUpgradesDisabled = isPaused || freeEnergyAvailable < 1;

    /**
     * Mapping between the system name and the icon name. Also used for iterating over all systems in specific order.
     */
    const systemIcons: Map<keyof SystemsStatusInfo, string> = new Map([
        ['farms', 'farm'],
        ['shield', 'defence'],
        ['thrusters', 'thrusters'],
        ['generator', 'generator']
    ]);
</script>

<div id="ship-canvas" style={resultShipCanvasStyle}>
	<div class="top">
		<JourneyProgress bind:value={journeyInfo.traveled} bind:max={journeyInfo.distance}/>
		<div class="resources">
			<ResourceAmountCounter type="health" bind:amount={resourcesInfo.hull} hint="hull"/>
			<ResourceAmountCounter type="people" bind:amount={resourcesInfo.crew} hint="people"/>
			<ResourceAmountCounter type="food" bind:amount={resourcesInfo.food} hint="food"/>
			<ResourceAmountCounter type="materials" bind:amount={resourcesInfo.materials} hint="materials"/>
		</div>
	</div>
	<div class="bottom-left">
		<div class="systems">
			{#each Array.from(systemIcons.keys()) as key}
				<SystemEnergyControl bind:value={systemsStatusInfo[key].energy}
									 bind:active={systemsStatusInfo[key].active}
									 bind:repairable={systemsStatusInfo[key].repairable}
									 bind:cost={systemsStatusInfo[key].repairCost}
									 bind:max={systemsStatusInfo[key].maxEnergy}
									 bind:available={freeEnergyAvailable}
									 bind:paused={isPaused}
									 icon={systemIcons.get(key)}
									 system={key}/>
			{/each}
		</div>
		<EnergyProductionProgress bind:value={totalEnergyInfo.energyProgress}
								  bind:max={totalEnergyInfo.energyProgressMax}
								  enabled={systemsStatusInfo.generator.energy > 0 && systemsStatusInfo.generator.active}/>
		<EnergyStorageProgress bind:value={freeEnergyAvailable} max="{totalEnergyInfo.maxUnusedEnergy}"/>
	</div>
	<div class="bottom-right">
		<SystemUpgradeControl bind:value={systemUpgradesInfo.repair}
							  bind:disabled={systemUpgradesDisabled}
							  max="2"
							  icon="repair-unit"
							  hint="repairs"/>
		<SystemUpgradeControl bind:value={systemUpgradesInfo.medical}
							  bind:disabled={systemUpgradesDisabled}
							  max="2"
							  icon="medical-unit"
							  hint="medical"/>
		<SystemUpgradeControl bind:value={systemUpgradesInfo.radar}
							  bind:disabled={systemUpgradesDisabled}
							  max="2"
							  icon="radar"
							  hint="radar"/>
		{#if isPaused}
			<img class="paused" src={pauseIconUrl} alt="Paused">
		{/if}
	</div>
</div>

<style>
    @keyframes pause-blink {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    #ship-canvas {
        --space-layer: unset;
        --clouds-layer: unset;
        --front-stars-layer: unset;
        --shift: 0;

        --front-shift: calc(var(--shift) * 4);
        --clouds-shift: calc(var(--shift) * 2);

        position: relative;
        height: 100%;

        background: var(--front-stars-layer) repeat-y 0 var(--front-shift) fixed,
        var(--clouds-layer) repeat-y 0 var(--clouds-shift) fixed,
        var(--space-layer) repeat-y 0 var(--shift) fixed;

        transition: background-position 0.1s ease-in-out;
    }

    #ship-canvas > :global(canvas) {
        top: unset !important;
        left: unset !important;
        transform: unset !important;
        height: unset !important;
    }

    .top {
        position: absolute;
        top: -1px;
        left: -1px;
        right: 0;
        z-index: 1;
    }

    .resources {
        position: absolute;
        top: 100%;
        left: 1px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-top: 1px;
    }

    .bottom-left {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
    }

    .bottom-right {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 1;
        display: flex;
    }

    .bottom-right .paused {
        position: absolute;
        bottom: 100%;
        right: 8px;
        margin-bottom: 16px;
        animation: pause-blink 1s infinite;
    }

    .systems {
        display: grid;
        grid-row-gap: 4px;
        width: max-content;
    }

    .systems :global(.tooltip.right) {
        top: -2px;
        bottom: 2px;
    }
</style>
<script lang="ts">
    import {onMount} from "svelte";
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
    import {type SystemsStatusInfo, systemsStatusStore} from "@/lib/storage/SystemsStatusStore";
    import TooltipActivator from "@/lib/components/ui/tooltips/TooltipActivator.svelte";
    import Tooltip from "@/lib/components/ui/tooltips/Tooltip.svelte";

    let systemsStatusInfo: SystemsStatusInfo;
    let systemUpgradesInfo: SubSystemsUpgradesInfo;
    let totalEnergyInfo: TotalEnergyInfo;
    let resourcesInfo: ResourcesInfo;
    let journeyInfo: JourneyProgressInfo;

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
    });

    systemsStatusStore.subscribe(storage => {
        systemsStatusInfo = storage;
    });

    subSystemsUpgradesStore.subscribe(storage => {
        systemUpgradesInfo = storage;
    });

    totalEnergyStore.subscribe(storage => {
        totalEnergyInfo = storage;
    });

    resourcesStore.subscribe(storage => {
        resourcesInfo = storage;
    });

    journeyProgressStore.subscribe(storage => {
        journeyInfo = storage;
    });

    $: totalEnergyUsedByUpgrades = systemUpgradesInfo.medical + systemUpgradesInfo.radar;

    $: totalEnergyUsedBySystems =
        systemsStatusInfo.farms.energy
        + systemsStatusInfo.shield.energy
        + systemsStatusInfo.thrusters.energy
        + systemsStatusInfo.generator.energy;

    $: freeEnergyAvailable = totalEnergyInfo.maxUnusedEnergy - totalEnergyUsedByUpgrades - totalEnergyUsedBySystems;

    $: systemsStatusStore.set(systemsStatusInfo);
    $: subSystemsUpgradesStore.set(systemUpgradesInfo);
    $: totalEnergyStore.set(totalEnergyInfo);
    $: resourcesStore.set(resourcesInfo);
</script>

<div id="ship-canvas">
	<div class="top">
		<JourneyProgress bind:value={journeyInfo.traveled} bind:max={journeyInfo.distance}/>
		<div class="resources">
			<TooltipActivator>
				<ResourceAmountCounter type="health" bind:amount={resourcesInfo.hull}/>
				<Tooltip position="right" pointer="arrow">hull</Tooltip>
			</TooltipActivator>
			<TooltipActivator>
				<ResourceAmountCounter type="people" bind:amount={resourcesInfo.crew}/>
				<Tooltip position="right" pointer="arrow">people</Tooltip>
			</TooltipActivator>
			<TooltipActivator>
				<ResourceAmountCounter type="food" bind:amount={resourcesInfo.food}/>
				<Tooltip position="right" pointer="arrow">food</Tooltip>
			</TooltipActivator>
			<TooltipActivator>
				<ResourceAmountCounter type="materials" bind:amount={resourcesInfo.materials}/>
				<Tooltip position="right" pointer="arrow">materials</Tooltip>
			</TooltipActivator>
		</div>
	</div>
	<div class="bottom-left">
		<div class="systems">
			<SystemEnergyControl bind:value={systemsStatusInfo.farms.energy}
								 bind:max={systemsStatusInfo.farms.maxEnergy} system="farm"/>
			<SystemEnergyControl bind:value={systemsStatusInfo.shield.energy}
								 bind:max={systemsStatusInfo.shield.maxEnergy} system="defence"/>
			<SystemEnergyControl bind:value={systemsStatusInfo.thrusters.energy}
								 bind:max={systemsStatusInfo.thrusters.maxEnergy} system="thrusters"/>
			<SystemEnergyControl bind:value={systemsStatusInfo.generator.energy}
								 bind:max={systemsStatusInfo.generator.maxEnergy} system="generator"/>
		</div>
		<EnergyProductionProgress bind:value={totalEnergyInfo.energyProgress}
								  bind:max={totalEnergyInfo.energyProgressMax}
								  enabled={systemsStatusInfo.generator.energy > 0}/>
		<EnergyStorageProgress bind:value={freeEnergyAvailable} max="{totalEnergyInfo.maxUnusedEnergy}"/>
	</div>
	<div class="bottom-right">
		<SystemUpgradeControl bind:value={systemUpgradesInfo.medical} max="2" system="medical-unit"/>
		<SystemUpgradeControl bind:value={systemUpgradesInfo.radar} max="2" system="radar"/>
	</div>
</div>

<style>
    #ship-canvas {
        position: relative;
        height: 100%;
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
        gap: 2px;
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

    .systems {
        display: grid;
        grid-row-gap: 4px;
    }
</style>
<script lang="ts">
    import {onMount} from "svelte";
    import SystemEnergyControl from "@/lib/components/ui/ship/SystemEnergyControl.svelte";
    import {type SystemsEnergyInfo, systemsEnergyStore} from "@/lib/storage/SystemsEnergyStore";
    import EnergyProductionProgress from "@/lib/components/ui/ship/EnergyProductionProgress.svelte";
    import EnergyStorageProgress from "@/lib/components/ui/ship/EnergyStorageProgress.svelte";
    import SystemUpgradeControl from "@/lib/components/ui/ship/SystemUpgradeControl.svelte";
    import {type SubSystemsUpgradesInfo, subSystemsUpgradesStore} from "@/lib/storage/SubSystemsUpgradesStore";
    import {type TotalEnergyInfo, totalEnergyStore} from "@/lib/storage/TotalEnergyStore";

    let energyLevels: SystemsEnergyInfo;
    let systemUpgrades: SubSystemsUpgradesInfo;
    let totalEnergy: TotalEnergyInfo;

    let energyProductionProgress = 30;

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

    systemsEnergyStore.subscribe(levels => {
        energyLevels = levels;
    });

    subSystemsUpgradesStore.subscribe(upgrades => {
        systemUpgrades = upgrades;
    });

    totalEnergyStore.subscribe(total => {
        totalEnergy = total;
    });

    $: totalEnergyUsedByUpgrades = systemUpgrades.medical + systemUpgrades.radar;
    $: totalEnergyUsedBySystems = energyLevels.farms + energyLevels.defence + energyLevels.propulsion + energyLevels.generator;
    $: freeEnergyAvailable = totalEnergy.maxUnusedEnergy - totalEnergyUsedByUpgrades - totalEnergyUsedBySystems;
</script>

<div id="ship-canvas">
	<div class="bottom-left">
		<div class="systems">
			<SystemEnergyControl bind:value={energyLevels.farms} system="farm"/>
			<SystemEnergyControl bind:value={energyLevels.defence} system="defence"/>
			<SystemEnergyControl bind:value={energyLevels.propulsion} system="thrusters"/>
			<SystemEnergyControl bind:value={energyLevels.generator} system="generator"/>
		</div>
		<EnergyProductionProgress bind:value={energyProductionProgress} enabled={energyLevels.generator > 0}/>
		<EnergyStorageProgress bind:value={freeEnergyAvailable} max="{totalEnergy.maxUnusedEnergy}"/>
	</div>
	<div class="bottom-right">
		<SystemUpgradeControl bind:value={systemUpgrades.medical} max="2" system="medical-unit"/>
		<SystemUpgradeControl bind:value={systemUpgrades.radar} max="2" system="radar"/>
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
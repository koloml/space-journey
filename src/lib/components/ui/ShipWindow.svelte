<script lang="ts">
    import {onMount} from "svelte";
    import SystemEnergyControl from "@/lib/components/ui/ship/SystemEnergyControl.svelte";
    import type {SystemsEnergyInfo} from "@/lib/storage/SystemsEnergyStore";
    import {systemsEnergyStore} from "@/lib/storage/SystemsEnergyStore";

    let systemEnergyLevels: SystemsEnergyInfo;

    onMount(() => {
        // We're using the LittleJS engine which is always creates a canvas element in the root of the document. We
        // need to move this canvas over there.
        document.getElementById('ship-canvas').append(
            mainCanvas,
            overlayCanvas,
            glCanvas
        );
    });

    systemsEnergyStore.subscribe(levels => {
        systemEnergyLevels = levels;
    });
</script>

<div id="ship-canvas">
	<div class="bottom-left">
		<div class="systems">
			<SystemEnergyControl bind:value={systemEnergyLevels.farms} system="farm"></SystemEnergyControl>
			<SystemEnergyControl bind:value={systemEnergyLevels.defence} system="defence"></SystemEnergyControl>
			<SystemEnergyControl bind:value={systemEnergyLevels.generator} system="generator"></SystemEnergyControl>
			<SystemEnergyControl bind:value={systemEnergyLevels.propulsion} system="thrusters"></SystemEnergyControl>
		</div>
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

    .systems {
        display: grid;
        grid-row-gap: 4px;
    }
</style>
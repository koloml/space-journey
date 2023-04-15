<script lang="ts">
    import {onMount} from "svelte";

    onMount(() => {
        // We're using the LittleJS engine which is always creates a canvas element in the root of the document. We
        // need to move this canvas over there.
        document.getElementById('ship-canvas').append(
            mainCanvas,
            overlayCanvas,
            glCanvas
        );
    });
</script>

<div id="ship-canvas">

</div>

<style>
	#ship-canvas {
		position: relative;
	}

	#ship-canvas > :global(canvas) {
		top: unset !important;
		left: unset !important;
		transform: unset !important;
		height: unset !important;
	}
</style>
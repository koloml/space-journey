<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    // Width and height of the game window, which will be scaled with "transform: scale" to fit the viewport.
    const width = 256;
    const height = 144;

    // Content of the style attribute.
    let scaleRatio = 1;

    // Refresh the window scale ration on the screen size change.
    function refreshScaleRatio() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        scaleRatio = Math.min(viewportWidth / width, viewportHeight / height);
    }

    onMount(() => {
        window.addEventListener('resize', refreshScaleRatio);
        refreshScaleRatio();
    });

    onDestroy(() => {
        window.removeEventListener('resize', refreshScaleRatio);
    });

    $: windowStyle = `transform: scale(${scaleRatio.toPrecision(4)}); width: ${width}px; height: ${height}px`;
</script>

<main style="{windowStyle}">
	<div class="resources">
		<slot name="resources"></slot>
	</div>
	<div class="display">
		<slot name="display"></slot>
	</div>
	<div class="logs">
		<slot name="logs"></slot>
	</div>
	<div class="decisions">
		<slot name="decisions"></slot>
	</div>
</main>

<style>
    main {
        padding: 1px;
        background: var(--color-background);
        transform-origin: center;
        display: grid;
        overflow: hidden;
        grid-template-areas: 'resources logs' 'display logs' 'display decisions';
        grid-row-gap: 1px;
        grid-column-gap: 1px;
        grid-template-columns: 1fr 100px;
        grid-template-rows: auto 1fr 40px;
    }

    .resources {
        grid-area: resources;
    }

    .display {
        grid-area: display;
    }

    .logs {
        grid-area: logs;
    }

    .decisions {
        grid-area: decisions;
    }
</style>
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
	<div class="display">
		<slot name="display"></slot>
	</div>
	<div class="logs">
		<slot name="logs"></slot>
	</div>
	<div class="decisions">
		<slot name="decisions"></slot>
	</div>
	<slot name="main"></slot>
</main>

<style>
    main {
        padding: 1px;
        background: var(--color-background);
        transform-origin: center;
        display: grid;
        overflow: hidden;
        grid-template-areas: 'display logs' 'display logs' 'display decisions';
        grid-column-gap: 1px;
        grid-template-columns: 1fr 100px;
        grid-template-rows: auto 1fr auto;
        position: relative;
    }

    .resources {
        grid-area: resources;
    }

    .display {
        grid-area: display;
    }

    .logs {
        background-color: var(--color-secondary-dark);
        grid-area: logs;
        margin: 1px;
        overflow-y: scroll;
        /* Scroll-bar is very huge, since we're scaling up the original-sized window. This line will disable the scroll
		   bar on the FireFox browsers. */
        scrollbar-width: none;
    }

    /* This line will disable the scroll-bar on the Chrome & Safari browsers, at least in the most modern ones. */
    .logs::-webkit-scrollbar {
        display: none;
    }

    .decisions {
        grid-area: decisions;
        /* Yeah, pixelated shadow. I'm not sure if there is a better way to do this. */
        box-shadow: 0 -1px 0 rgba(14, 12, 24, 0.9),
        0 -2px 0 rgba(14, 12, 24, 0.8),
        0 -3px 0 rgba(14, 12, 24, 0.7),
        0 -4px 0 rgba(14, 12, 24, 0.6),
        0 -5px 0 rgba(14, 12, 24, 0.5),
        0 -6px 0 rgba(14, 12, 24, 0.4),
        0 -7px 0 rgba(14, 12, 24, 0.3),
        0 -8px 0 rgba(14, 12, 24, 0.2),
        0 -9px 0 rgba(14, 12, 24, 0.1);
    }
</style>
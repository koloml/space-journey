<script lang="ts">
    import defeatUrl from '@/assets/images/game-over-panel/defeat.png';
    import victoryUrl from '@/assets/images/game-over-panel/victory.png';
    import {onDestroy, onMount} from "svelte";

    let locationHash = window.location.hash;

    function refreshLocation() {
        window.location.hash = locationHash;
    }

    onMount(() => {
        window.addEventListener('hashchange', refreshLocation);
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', refreshLocation);
    });

    $: sanitizedLocation = locationHash.replace('#', '');
    $: isVictory = sanitizedLocation === 'won';
    $: buttonText = isVictory ? "humanity saved" : "it's horrible";
</script>

<div class="game-over">
	<div class="modal">
		{#if isVictory}
			<img src={victoryUrl} alt="Victory"/>
		{:else}
			<img src={defeatUrl} alt="Defeat"/>
		{/if}
		<a href="#">{buttonText}</a>
	</div>
</div>

<style>
    .game-over {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        z-index: 100;
        align-items: center;
        justify-content: center;
    }

    .game-over img {
        display: block;
    }

    .modal {
        position: relative;
    }

    .modal a {
        position: absolute;
        bottom: 1px;
        font-family: LazyFox7, serif;
        font-size: 8px;
        line-height: 7px;
        left: 10px;
        right: 10px;
        text-align: center;
        text-decoration: unset;
        border: 1px solid var(--color-primary);
        padding: 1px 0 0;
    }
</style>
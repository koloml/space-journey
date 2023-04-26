<script lang="ts">
    import GameContainer from "@/lib/components/GameContainer.svelte";
    import LogWindow from "@/lib/components/game/LogWindow.svelte";
    import ShipWindow from "@/lib/components/game/ShipWindow.svelte";
    import DecisionsWindow from "@/lib/components/game/DecisionsWindow.svelte";
    import MainMenuOverlay from "@/lib/components/MainMenuOverlay.svelte";
    import {getContext, onMount} from "svelte";
    import type Game from "@/lib/game/Game";
    import GameResultsOverlay from "@/lib/components/GameResultsOverlay.svelte";

    /**
     * Sadly, we didn't use the routing provided by the framework, so we have to route between different scenes
     * manually. Additionally, LittleJS engine doesn't support de-initialization and re-initialization, so we need to
     * keep the canvases alive even after game restart or before it even began.
     */
    let currentView = location.hash;

    onMount(() => {
        // Disable the zoom by Ctrl+Scroll
        document.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, {passive: false});

        // Disable the zoom by Ctrl+Plus/Minus
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === '+' || e.key === '=' || e.key === '-')) {
                e.preventDefault();
            }
        });

        /**
         * Look for hash changes and assign a new location to the currentView variable. Hash might be changed
         * programmatically or by pressing the links with hashes.
         */
        window.addEventListener('hashchange', () => {
            currentView = location.hash;
        });
    });

    /**
     * This variable will sanitize the view variable and, additionally, when no hash is present, it will default to
     * main menu.
     */
    $: sanitizedView = currentView.replace('#', '') || 'main-menu';

    /**
     * If a new game is selected, then we start up the new game. This will reset any state the game currently has and
     * will show the main game screen.
     */
    $: if (sanitizedView === 'game') {
        const game = getContext<Game>('game');

        game.startNewGame();
    }
</script>

<GameContainer>
	<ShipWindow slot="display"/>
	<LogWindow slot="logs"/>
	<DecisionsWindow slot="decisions"/>
	<div slot="main">
		{#if sanitizedView === 'main-menu'}
			<MainMenuOverlay/>
		{/if}
		{#if sanitizedView === 'won' || sanitizedView === 'lost'}
			<GameResultsOverlay/>
		{/if}
	</div>
</GameContainer>
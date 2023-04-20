<script lang="ts">
    import GameContainer from "@/lib/components/GameContainer.svelte";
    import LogWindow from "@/lib/components/game/LogWindow.svelte";
    import ShipWindow from "@/lib/components/game/ShipWindow.svelte";
    import DecisionsWindow from "@/lib/components/game/DecisionsWindow.svelte";
    import {onMount} from "svelte";

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
    });
</script>

<GameContainer>
	<ShipWindow slot="display"></ShipWindow>
	<LogWindow slot="logs"></LogWindow>
	<DecisionsWindow slot="decisions"></DecisionsWindow>
</GameContainer>
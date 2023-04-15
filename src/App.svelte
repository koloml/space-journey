<script lang="ts">
    import GameContainer from "./lib/GameContainer.svelte";
    import LogWindow from "./lib/ui/LogWindow.svelte";
    import ResourcesWindow from "./lib/ui/ResourcesWindow.svelte";
    import ShipWindow from "./lib/ui/ShipWindow.svelte";
    import DecisionsWindow from "./lib/ui/DecisionsWindow.svelte";
</script>

<GameContainer>
	<ResourcesWindow slot="resources"></ResourcesWindow>
	<ShipWindow slot="display"></ShipWindow>
	<LogWindow slot="logs"></LogWindow>
	<DecisionsWindow slot="decisions"></DecisionsWindow>
</GameContainer>
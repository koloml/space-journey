<script lang="ts">
    import JourneyProgress from "@/lib/components/ui/resources/JourneyProgress.svelte";
    import ResourceAmountCounter from "@/lib/components/ui/resources/ResourceAmountCounter.svelte";
</script>

<div class="resources">
	<JourneyProgress value="75" max="100"></JourneyProgress>
	<div class="counters">
		<ResourceAmountCounter resourceType="health" amount="25"></ResourceAmountCounter>
		<ResourceAmountCounter resourceType="people" amount="50"></ResourceAmountCounter>
		<ResourceAmountCounter resourceType="materials" amount="75"></ResourceAmountCounter>
	</div>
</div>

<style>
    .resources {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr [end];
		position: relative;
		padding: 1px;
    }

    .counters {
		position: absolute;
        display: flex;
        flex-direction: column;
        gap: 2px;
		top: calc(100%);
		padding-top: 1px;
    }
</style>
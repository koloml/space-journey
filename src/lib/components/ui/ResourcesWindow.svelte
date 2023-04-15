<script lang="ts">
    import JourneyProgress from "@/lib/components/ui/resources/JourneyProgress.svelte";
    import ResourceAmountCounter from "@/lib/components/ui/resources/ResourceAmountCounter.svelte";
</script>

<div class="resources">
	<JourneyProgress value="75" max="100"></JourneyProgress>
	<div class="counters">
		<ResourceAmountCounter resourceType="health" amount="25"></ResourceAmountCounter>
		<ResourceAmountCounter resourceType="crew" amount="50"></ResourceAmountCounter>
		<ResourceAmountCounter resourceType="matter" amount="75"></ResourceAmountCounter>
	</div>
</div>

<style>
    .resources {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr [end];
		position: relative;
    }

    .counters {
		position: absolute;
        display: flex;
        flex-direction: column;
        gap: 1px;
		top: calc(100%);
		padding: 1px 1px 0;
    }

    .counters > :global(*) {
		padding-bottom: 1px;
        border-bottom: 1px solid #42486b;
    }
</style>
<script lang="ts">
    export let resourceType = "image";

    export let amount: string|number = 0;

    let resourceUrl = new URL(`/src/assets/images/resources/${resourceType}.png`, import.meta.url);

    let amountPadded = parseInt(amount.toString()).toString().padStart(3, "0");
</script>

<div class="resource">
	<img src="{resourceUrl}" alt="{resourceType}" class="icon">
	<span class="amount">{amountPadded}</span>
</div>

<style>
    .resource {
        display: flex;
        align-items: center;
    }

    .icon {
        width: 7px;
        height: 7px;
		margin-right: 1px;
		margin-top: -1px;
		margin-bottom: -1px;
    }

	.amount {
		height: 5px;
		line-height: 4px;
	}
</style>
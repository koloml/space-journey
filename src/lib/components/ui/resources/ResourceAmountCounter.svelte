<script lang="ts">
    export let resourceType = "image";

    export let amount: string|number = 0;

    let amountPadded = parseInt(amount.toString()).toString().padStart(3, "0");
</script>

<div class="resource">
	<img src="/assets/resources/icon-{resourceType}.png" alt="{resourceType}" class="icon">
	<span class="amount">{amountPadded}</span>
</div>

<style>
    .resource {
        display: flex;
        align-items: center;
    }

    .icon {
        width: 5px;
        height: 5px;
		margin-right: 1px;
    }

	.amount {
		height: 5px;
		line-height: 4px;
	}
</style>
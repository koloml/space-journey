<script lang="ts">
    let amountPadded;

    export let type = "image";

    export let amount: string | number = 0;

    let resourceUrl = new URL(`/src/assets/images/resources/${type}.png`, import.meta.url);

    $: amountPadded = parseInt(amount.toString())
        .toString()
        .padStart(3, "0")
        .slice(0, 3 - amount.toString().length)
</script>

<div class="resource">
	<img src="{resourceUrl}" alt="{type}" class="icon">
	<span class="amount">
		<span class="padded">{amountPadded}</span>
		{amount}
	</span>
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
		display: flex;
    }

	.amount .padded {
		color: var(--color-secondary);
	}
</style>
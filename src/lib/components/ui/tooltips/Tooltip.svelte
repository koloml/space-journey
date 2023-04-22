<script lang="ts">
	import hintArrowLeftUrl from "@/assets/images/hint-arrow.png";

    export let position: string;
    export let pointer: string;


</script>

<div class="tooltip {position}">
	{#if pointer === 'arrow' && position === 'right'}
		<img src={hintArrowLeftUrl} alt="arrow">
	{/if}
	<slot></slot>
</div>

<style>
    .tooltip {
        position: absolute;
        display: none;
        font-family: LazyFox7, serif;
        font-size: 8px;
        line-height: 7px;
		background-color: var(--color-background);
		padding: 1px 0 1px 1px;
		margin: -1px;
    }

    .tooltip.right {
        left: 100%;
        top: 0;
        bottom: 0;
    }

	.tooltip.right img {
		width: 7px;
		height: 7px;
		margin: -1px 0 -1px -1px;
	}

	:global(.activator:hover) .tooltip {
		display: flex;
	}
</style>
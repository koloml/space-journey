<script lang="ts">
	import progressArrowUrl from "@/assets/images/progress-arrow.png";

    export let value = 0;
    export let max = 0;

    let progress = value / max;
    let progressPercent = Math.round(progress * 100);
</script>

<div class="progress">
	<div class="full"></div>
	<div class="bar" style="width: {progressPercent}%">
		<img src="{progressArrowUrl}" alt="Progress">
	</div>
</div>

<style>
    .progress {
		position: relative;
		height: 5px;
		grid-column: 1 / end;
		display: flex;
		padding: 1px;
		border-left: 1px solid var(--color-primary);
		width: 100px;
    }

	.full {
		position: absolute;
		height: 1px;
		background: var(--color-secondary);
		width: 100%;
		top: 2px;
		z-index: -1;
	}

	.bar {
		background: var(--color-primary);
		position: relative;
	}

	.bar img {
		position: absolute;
		right: -3px;
		top: -2px;
	}
</style>
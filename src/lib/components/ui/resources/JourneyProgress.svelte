<script lang="ts">
    export let value = 0;
    export let max = 0;

    let progress = value / max;
    let progressPercent = Math.round(progress * 100);
</script>

<div class="progress">
	<div class="bar" style="width: {progressPercent}%"></div>
</div>

<style>
    .progress {
		position: relative;
		height: 4px;
		grid-column: 1 / end;
		display: flex;
    }

	.bar {
		background: #42486b;
	}
</style>
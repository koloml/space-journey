<script lang="ts">
    import progressBackgroundUrl from '@/assets/images/energy-bar/bar-background.png';

    export let enabled: string;

    export let value = 0;

    export let max = 100;

    $: backgroundStyle = `--icon-url: url(${progressBackgroundUrl})`;
    $: currentStyle = 'width: ' + (value / max * 100) + '%';

</script>

<div class="progress-background{enabled ? ' enabled' : ''}" style="{backgroundStyle}">
	<div class="bar">
		<div class="current" style="{currentStyle}"></div>
	</div>
</div>

<style>
    .progress-background {
        --icon-url: unset;

        position: relative;
        width: 54px;
        height: 8px;
        background-image: var(--icon-url);
        background-position-y: top;
        background-repeat: no-repeat;
        margin-left: 1px;
    }

    .progress-background.enabled {
        background-position-y: bottom;
    }

    .bar {
        position: absolute;
        border: 1px solid transparent;
        bottom: 0;
        left: 3px;
        height: 5px;
        width: 27px;
    }

    .current {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 0;
        background-color: var(--color-primary);
    }
</style>
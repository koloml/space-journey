<script lang="ts">
    import minusIconUrl from '@/assets/images/minus.png';
    import plusIconUrl from '@/assets/images/plus.png';

    export let value: number;
    export let max = 2;
    export let system: string;

    let minusClassList, minusStyle;
    let plusClassList, plusStyle;

    $: minusClassList = value > 0 ? 'minus' : 'minus disabled';
    $: plusClassList = value < max ? 'plus' : 'plus disabled';
    $: minusStyle = `--icon-url: url(${minusIconUrl})`;
    $: plusStyle = `--icon-url: url(${plusIconUrl})`;

    let systemIconUrl = new URL(`/src/assets/images/systems/${system}.png`, import.meta.url);
</script>

<div class="control">
	<div class="{minusClassList}" style="{minusStyle}" on:click="{() => (value = Math.max(--value, 0))}"></div>
	<div class="state">
		<div class="full" style="--width: {max}"></div>
		<div class="current" style="--width: {value}"></div>
		<img src="{systemIconUrl}" alt="{system}" class="{value === 0 ? 'disabled' : ''}">
	</div>
	<div class="{plusClassList}" style="{plusStyle}" on:click="{() => (value = Math.min(++value, max))}"></div>
</div>

<style>
    .control {
        display: flex;
        align-items: flex-end;
    }

    .state {
        height: 3px;
        position: relative;
        margin-left: 2px;
    }

    .full {
        background-image: repeating-linear-gradient(
                to right,
                var(--color-secondary) 0, var(--color-secondary) 2px,
                var(--color-background) 2px, var(--color-background) 3px);
        width: calc(3px * (var(--width) + 1) - 1px);
    }

    .current {
        background-image: repeating-linear-gradient(
                to right,
                var(--color-primary) 0, var(--color-primary) 2px,
                var(--color-background) 2px, var(--color-background) 3px);
        width: calc(3px * (var(--width) + 1) - 1px);
        position: absolute;
        left: 0;
        top: 0;
    }

    .full, .current {
        background-repeat: repeat-x;
        height: 3px;
    }

    .state img {
        position: absolute;
        bottom: 0;
        left: -2px;
        width: 7px;
        height: 7px;
        object-fit: cover;
        object-position: right;
        margin: -1px;
    }
	
	.state img.disabled {
		object-position: left;
	}

    .minus, .plus {
        --icon-url: unset;

        width: 5px;
        height: 5px;
        background-image: var(--icon-url);
        background-position-x: 0;
        cursor: pointer;
        margin: -1px 0;
    }

    .minus:hover, .plus:hover {
        background-position-x: 5px;
    }

    .minus.disabled, .plus.disabled {
        opacity: 0;
    }
</style>
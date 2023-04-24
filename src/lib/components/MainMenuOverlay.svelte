<div class="main-menu">
	<div class="game-name">GENERATION SHIP</div>
	<nav>
		<a href="#game">Start</a>
	</nav>
	<div class="authors">
		<div>
			<a href="https://lazy-fox.itch.io/">LazyFox</a> <span>artwork, design</span>
		</div>
		<div>
			<a href="https://koloml.itch.io/">KoloMl</a> <span>programming</span>
		</div>
	</div>
	<div class="game-jam">
		<div>
			<span>Made for</span> <a href="https://itch.io/jam/gamedevjs-2023">Gamedev.js 2023</a>
		</div>
		<div>
			<span>Source code on</span> <a href="https://github.com/koloml/space-journey">GitHub</a>
		</div>
	</div>
</div>

<style>
    .main-menu {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: var(--color-background);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        line-height: 9px;
    }

    .game-name {
        margin-bottom: 20px;
        text-shadow: 2px 0 0 var(--color-secondary), 4px 0 0 var(--color-secondary-dark);
        font-size: 20px;
    }

    nav a {
        text-decoration: unset;
        display: block;
    }

    .authors, .game-jam {
        position: absolute;
        font-family: LazyFox7, serif;
        font-size: 8px;
        line-height: 7px;
    }

    .authors {
        bottom: 0;
        left: 0;
		text-align: left;
    }

    .game-jam {
        bottom: 0;
        right: 0;
		text-align: right;
    }

    .authors a, .game-jam a {
        text-decoration: unset;
    }

    .authors span, .game-jam span {
        color: var(--color-secondary);
    }
</style>
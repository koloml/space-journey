import 'littlejsengine/engine/index.d.ts';
import 'unfonts.css';
import './app.css';
import App from './App.svelte';
import Game from "@/lib/game/Game";

const gameObject = new Game();

const app = new App({
    target: document.getElementById('app'),
    context: new Map([
        ['game', gameObject]
    ])
});

export default app;

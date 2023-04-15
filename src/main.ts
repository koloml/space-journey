import 'littlejsengine/engine/index.d.ts';
import 'unfonts.css';
import './app.css';
import App from './App.svelte';

const app = new App({
    target: document.getElementById('app'),
});

export default app;

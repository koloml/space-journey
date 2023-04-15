import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import Unfonts from "unplugin-fonts/vite";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    plugins: [
        svelte(),
        Unfonts({
            custom: {
                families: [
                    {
                        name: 'LazyFox1',
                        src: '/src/assets/fonts/font-1.ttf',
                        local: 'LazyFox1'
                    },
                    {
                        name: 'LazyFox6',
                        src: '/src/assets/fonts/font-6.ttf',
                        local: 'LazyFox1'
                    },
                ]
            }
        })
    ],
})

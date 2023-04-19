import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import Unfonts from "unplugin-fonts/vite";
import { svelteSVG } from "rollup-plugin-svelte-svg";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
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
                        local: 'LazyFox6'
                    },
                    {
                        name: 'LazyFox7',
                        src: '/src/assets/fonts/font-7.ttf',
                        local: 'LazyFox7'
                    }
                ]
            }
        }),
        svelteSVG({
            enforce: 'pre'
        })
    ],
})

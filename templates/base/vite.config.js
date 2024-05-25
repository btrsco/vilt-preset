import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig( {
    resolve:      {
        extensions: [ '.js', '.vue', '.ts', '.json', '.scss' ],
        alias:      {
            '@': '/resources',
        },
    },
    plugins:      [
        laravel( {
            input:   'resources/scripts/app.ts',
            ssr:     'resources/scripts/ssr.ts',
            refresh: true,
        } ),
        vue( {
            template: {
                transformAssetUrls: {
                    base:            null,
                    includeAbsolute: false,
                },
            },
        } ),
    ],
} );

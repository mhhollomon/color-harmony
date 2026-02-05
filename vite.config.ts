import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

const URL_PREFIX = '/color-harmony/';
export default defineConfig(({ command, mode }) => {
    const isProduction = (command === 'build' && mode === 'production');

    return {
        base: (isProduction ? URL_PREFIX : ''),
        baseUrl: (isProduction ? URL_PREFIX : ''),
        plugins: [react(), tsconfigPaths()],
        build: {
            outDir: 'build-web-deploy',
            cssMinify: 'lightningcss',
        },
        css : {
            transformer: 'lightningcss'
        }

    };
});

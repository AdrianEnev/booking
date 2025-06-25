import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

export default defineConfig(({ isSsrBuild }) => ({
    alias: {
        '@components': path.resolve(__dirname, './app/components'),
        '@routes': path.resolve(__dirname, './app/routes'),
        '@use': path.resolve(__dirname, './app/use'),
        '@assets': path.resolve(__dirname, './app/assets'),
        "@config": path.resolve(__dirname, './config'),
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
}));

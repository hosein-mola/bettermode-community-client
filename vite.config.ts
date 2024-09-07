import react from "@vitejs/plugin-react";
import path from "path";
import {defineConfig} from "vite";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
// viteCompression(), visualizer()
export default defineConfig({
    plugins: [react(), viteCompression()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, ".//src/"),
        },
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) return id.toString().split("node_modules/")[1].split("/")[0].toString();
                },
            },
        },
    },
});

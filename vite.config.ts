import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        proxy: {
            "/graphql": "http://localhost:8000",
            "/auth": "http://localhost:8000",
            "/file": "http://localhost:8000",
            "/api": "http://localhost:8000"
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            cache: true,
            output: {
                entryFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
});

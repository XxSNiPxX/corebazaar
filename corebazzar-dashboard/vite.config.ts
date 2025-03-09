import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		"process.env": {}, // Define an empty object or specify needed env variables
	},
	plugins: [
		react(),
		//eslint(),
		svgr({
			svgrOptions: {
				dimensions: false,
			},
		}),
	],
	resolve: {
		alias: [{ find: "~/", replacement: "/src/" }],
	},
});

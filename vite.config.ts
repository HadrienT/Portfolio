/// <reference types="vitest/config" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: { "@": resolve(__dirname, "src") },
	},
	server: { port: 5190, host: true },
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test-setup.ts"],
		css: false,
		globals: true,
	},
});

// Full-page screenshots of every route, desktop and mobile, light and dark,
// against `vite preview` (run `npm run build` first). Output: screenshots/.
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = { home: "/", "quant-modeling": "/projects/quant-modeling" };
const VIEWPORTS = {
	desktop: { width: 1440, height: 900 },
	mobile: { width: 390, height: 844 },
};

const server = spawn(
	"npx",
	["vite", "preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "ignore" },
);

async function waitForServer() {
	for (let i = 0; i < 150; i++) {
		try {
			if ((await fetch(BASE)).ok) return;
		} catch {
			/* not up yet */
		}
		await new Promise((r) => setTimeout(r, 200));
	}
	throw new Error("vite preview did not start");
}

try {
	await waitForServer();
	await mkdir("screenshots", { recursive: true });
	const browser = await chromium.launch({
		executablePath: process.env.CHROMIUM_PATH || undefined,
	});
	for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
		for (const scheme of ["light", "dark"]) {
			const page = await browser.newPage({
				viewport,
				colorScheme: scheme,
				reducedMotion: "reduce",
			});
			for (const [name, route] of Object.entries(ROUTES)) {
				await page.goto(BASE + route, { waitUntil: "networkidle" });
				const file = `screenshots/${name}-${vpName}-${scheme}.png`;
				await page.screenshot({ path: file, fullPage: true });
				console.log(file);
			}
			await page.close();
		}
	}
	await browser.close();
} finally {
	server.kill();
}

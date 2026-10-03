import { useEffect, useRef } from "react";
import { gbmPaths } from "@/lib/random";

const COUNT = 64;
const STEPS = 160;
const SIGMA = 0.35;
const SEED = 20260;
const DRAW_MS = 2600;

/**
 * Monte-Carlo paths of a geometric Brownian motion drawn left to right — the
 * hero's backdrop. Deterministic (seeded), redrawn on resize and theme change,
 * static under `prefers-reduced-motion`.
 */
export function PathsCanvas({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const paths = gbmPaths(COUNT, STEPS, SIGMA, SEED);
		const terminal = paths.map((p) => p[STEPS]!).sort((a, b) => a - b);
		const lo = Math.log(terminal[Math.floor(COUNT * 0.02)]!) * 1.15;
		const hi = Math.log(terminal[Math.ceil(COUNT * 0.98) - 1]!) * 1.15;
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let frame = 0;
		let start = 0;
		let current = reduced ? 1 : 0;

		const draw = (progress: number) => {
			current = progress;
			const { width, height } = canvas;
			const style = getComputedStyle(canvas);
			const accent = style.getPropertyValue("--color-accent").trim();
			const muted = style.getPropertyValue("--color-ink-muted").trim();

			ctx.clearRect(0, 0, width, height);
			const x = (i: number) => (i / STEPS) * width;
			const y = (s: number) =>
				height * (0.92 - (0.84 * (Math.log(s) - lo)) / (hi - lo));
			const last = Math.max(1, Math.floor(progress * STEPS));
			const dpr = window.devicePixelRatio || 1;

			paths.forEach((path, k) => {
				const highlight = k % 16 === 0;
				ctx.beginPath();
				ctx.moveTo(x(0), y(path[0]!));
				for (let i = 1; i <= last; i++) ctx.lineTo(x(i), y(path[i]!));
				ctx.strokeStyle = highlight ? accent : muted;
				ctx.globalAlpha = highlight ? 0.9 : 0.22;
				ctx.lineWidth = (highlight ? 1.6 : 1) * dpr;
				ctx.stroke();
			});
			ctx.globalAlpha = 1;
		};

		const animate = (t: number) => {
			if (!start) start = t;
			const progress = Math.min(1, (t - start) / DRAW_MS);
			// ease-out, so the fan settles rather than stops
			draw(1 - (1 - progress) ** 3);
			if (progress < 1) frame = requestAnimationFrame(animate);
		};

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.round(canvas.clientWidth * dpr);
			canvas.height = Math.round(canvas.clientHeight * dpr);
			draw(current);
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);
		const themeObserver = new MutationObserver(() => draw(current));
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		resize();
		if (!reduced) frame = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			themeObserver.disconnect();
		};
	}, []);

	return <canvas ref={ref} aria-hidden="true" className={className} />;
}

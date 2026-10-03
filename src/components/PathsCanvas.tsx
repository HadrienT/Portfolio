import { useEffect, useRef } from "react";
import { gbmPaths, meanPath } from "@/lib/random";

/** The simulated model, shown in the hero's legend. */
export const HERO_MODEL = { count: 64, mu: 0.1, sigma: 0.35 } as const;

const STEPS = 160;
const SEED = 20260;
const DRAW_MS = 2600;

/**
 * Monte-Carlo paths of a geometric Brownian motion drawn left to right, with
 * their sample mean and the exact expectation E[S_t] = e^{mu t} — the hero's
 * backdrop. Deterministic (seeded), redrawn on resize and theme change, static
 * under `prefers-reduced-motion`.
 */
export function PathsCanvas({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const { count, mu, sigma } = HERO_MODEL;
		const paths = gbmPaths(count, STEPS, sigma, SEED, mu);
		const mean = meanPath(paths);
		const expectation = mean.map((_, i) => Math.exp((mu * i) / STEPS));
		const terminal = paths.map((p) => p[STEPS]!).sort((a, b) => a - b);
		const lo = Math.log(terminal[Math.floor(count * 0.02)]!) * 1.15;
		const hi = Math.log(terminal[Math.ceil(count * 0.98) - 1]!) * 1.15;
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
			const ink = style.getPropertyValue("--color-ink").trim();

			ctx.clearRect(0, 0, width, height);
			const x = (i: number) => (i / STEPS) * width;
			const y = (s: number) =>
				height * (0.94 - (0.88 * (Math.log(s) - lo)) / (hi - lo));
			const last = Math.max(1, Math.floor(progress * STEPS));
			const dpr = window.devicePixelRatio || 1;

			const line = (
				path: number[],
				color: string,
				alpha: number,
				width: number,
				dash: number[] = [],
			) => {
				ctx.beginPath();
				ctx.moveTo(x(0), y(path[0]!));
				for (let i = 1; i <= last; i++) ctx.lineTo(x(i), y(path[i]!));
				ctx.strokeStyle = color;
				ctx.globalAlpha = alpha;
				ctx.lineWidth = width * dpr;
				ctx.setLineDash(dash.map((d) => d * dpr));
				ctx.stroke();
			};

			paths.forEach((path, k) => {
				if (k % 16 === 0) line(path, accent, 0.55, 1.2);
				else line(path, muted, 0.2, 1);
			});
			line(expectation, ink, 0.75, 1.5, [5, 5]);
			line(mean, accent, 1, 2.6);
			ctx.setLineDash([]);
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

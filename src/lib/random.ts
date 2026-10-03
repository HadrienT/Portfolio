/** Small seeded PRNG (mulberry32), so the hero paths are the same every visit. */
export function mulberry32(seed: number) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Standard normal draws by Box-Muller on a uniform source. */
export function normalSource(uniform: () => number) {
	return () => {
		const u = Math.max(uniform(), 1e-12);
		const v = uniform();
		return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
	};
}

/**
 * Geometric Brownian motion paths, S0 = 1, on `steps` equal steps over [0, 1].
 * Returns one array of `steps + 1` levels per path.
 */
export function gbmPaths(
	count: number,
	steps: number,
	sigma: number,
	seed: number,
	mu = 0,
): number[][] {
	const normal = normalSource(mulberry32(seed));
	const dt = 1 / steps;
	const drift = (mu - 0.5 * sigma * sigma) * dt;
	const vol = sigma * Math.sqrt(dt);
	return Array.from({ length: count }, () => {
		const path = [1];
		let s = 1;
		for (let i = 0; i < steps; i++) {
			s *= Math.exp(drift + vol * normal());
			path.push(s);
		}
		return path;
	});
}

/** Pointwise average of equal-length paths (the Monte-Carlo estimate of E[S_t]). */
export function meanPath(paths: number[][]): number[] {
	const n = paths.length;
	return paths[0]!.map((_, i) => paths.reduce((acc, p) => acc + p[i]!, 0) / n);
}

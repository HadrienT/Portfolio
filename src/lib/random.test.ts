import { gbmPaths, meanPath, mulberry32, normalSource } from "./random";

describe("random", () => {
	it("is deterministic for a given seed", () => {
		expect(gbmPaths(3, 10, 0.2, 7)).toEqual(gbmPaths(3, 10, 0.2, 7));
	});

	it("draws standard normals", () => {
		const normal = normalSource(mulberry32(1));
		const n = 50_000;
		const xs = Array.from({ length: n }, normal);
		const mean = xs.reduce((a, b) => a + b, 0) / n;
		const variance = xs.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
		expect(Math.abs(mean)).toBeLessThan(0.02);
		expect(Math.abs(variance - 1)).toBeLessThan(0.03);
	});

	it("keeps GBM a martingale when mu = 0", () => {
		const paths = gbmPaths(20_000, 4, 0.3, 11);
		const mean = paths.reduce((a, p) => a + p[4]!, 0) / paths.length;
		// standard error of the terminal mean ~ sqrt(e^{0.09} - 1) / sqrt(n) ≈ 0.002
		expect(Math.abs(mean - 1)).toBeLessThan(0.01);
	});

	it("averages paths into an estimate of E[S_t] = e^{mu t}", () => {
		const mu = 0.1;
		const mean = meanPath(gbmPaths(20_000, 4, 0.3, 5, mu));
		expect(mean[0]).toBe(1);
		mean.forEach((m, i) => {
			expect(Math.abs(m - Math.exp((mu * i) / 4))).toBeLessThan(0.01);
		});
	});
});

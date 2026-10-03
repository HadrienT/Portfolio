/**
 * Copy of the quant-modeling case study. Numbers come from the project's
 * README and blueprint (GPU table: `build-cuda/qm_gpu_table_bench`); keep them
 * in step when that repository publishes new ones.
 */

export const layers = [
	{
		name: "C++20 core",
		detail:
			"instruments · models · engines · pricers, wired by a registry. No engine branches on a product; no instrument reads market data.",
	},
	{
		name: "pybind11",
		detail: "the library as a Python wheel, with the GPU backend when built.",
	},
	{
		name: "FastAPI",
		detail:
			"pricing, market data, credit, rates, xVA; every valuation logged and replayable.",
	},
	{
		name: "React",
		detail: "a typed front end generated from the API's OpenAPI schema.",
	},
];

export const pillars = [
	{
		title: "Adjoint differentiation",
		body: "An operator-overloading tape with checkpointing and a parallel path computes the full Greek vector for about the cost of one extra valuation — carried through calibration to the vega of any scripted product to each quoted option of the chain.",
	},
	{
		title: "Monte Carlo on two GPUs",
		body: "Payoff scripts compile to a stack-machine bytecode that runs unchanged on the CPU and in a CUDA kernel. Every path is a pure function of (seed, index), so one GPU and two GPUs agree bit for bit, and the CPU to 1e-12.",
	},
	{
		title: "Calibrated on real data",
		body: "SVI per maturity and Dupire local vol from stored option chains, Heston fitted by COS + Levenberg-Marquardt, stochastic-local vol by the particle method, rough Bergomi calibrated.",
	},
	{
		title: "A payoff language",
		body: "Lexer → parser → AST → fuzzy-logic evaluator in the Andreasen–Savine style: one generic Monte-Carlo engine prices any scripted payoff, including early exercise by Longstaff-Schwartz.",
	},
	{
		title: "xVA capstone",
		body: "Exposure engine on CPU and on the GPUs, netting sets, collateral and initial margin, CVA / DVA / FVA / MVA / KVA, regulatory capital, wrong-way risk, and CVA sensitivities by AAD.",
	},
	{
		title: "Tested like a library",
		body: "~70 GoogleTest suites favouring properties — call-put parity, in + out = vanilla, monotonicity, measured convergence order — plus ASan / UBSan builds and CI on every layer.",
	},
];

export interface BenchRow {
	product: string;
	cpu1: string;
	cpu8: string;
	gpu1: string;
	gpu2: string;
}

/** Wall time to a 1e-4 relative standard error, pseudo-random paths. */
export const gpuBench: BenchRow[] = [
	{
		product: "Vanilla Black-Scholes",
		cpu1: "8.9 s",
		cpu8: "1.3 s",
		gpu1: "28 ms",
		gpu2: "17 ms",
	},
	{
		product: "Up-and-out, daily, local vol",
		cpu1: "169 min",
		cpu8: "27 min",
		gpu1: "25.2 s",
		gpu2: "12.7 s",
	},
	{
		product: "Worst-of autocall, 3 assets",
		cpu1: "10.3 s",
		cpu8: "1.5 s",
		gpu1: "41 ms",
		gpu2: "34 ms",
	},
	{
		product: "Superbucket (363 local-vol risks)",
		cpu1: "51.5 s",
		cpu8: "7.5 s",
		gpu1: "237 ms",
		gpu2: "237 ms",
	},
];

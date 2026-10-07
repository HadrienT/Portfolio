/**
 * Projects shown on the home page. `slug` set → the project has its own page
 * under /projects/<slug>.
 */

export interface Metric {
	value: string;
	label: string;
}

export interface Project {
	slug?: string;
	name: string;
	tagline: string;
	description: string;
	tags: string[];
	metrics: Metric[];
	links: { label: string; href: string }[];
	featured?: boolean;
}

export const QUANT_APP_URL = "https://quant.tramonihadrien.com";

export const projects: Project[] = [
	{
		slug: "quant-modeling",
		name: "quant-modeling",
		tagline: "A derivatives pricing library, from the C++ core to a web app.",
		description:
			"C++20 core split into instruments, models, engines and pricers; " +
			"adjoint Greeks; Monte Carlo on two V100s, bit-identical across GPU " +
			"counts and within 1e-12 of the CPU; " +
			"an xVA capstone. Carried through pybind11 and FastAPI to a React app.",
		tags: ["C++20", "CUDA", "AAD", "pybind11", "FastAPI", "React"],
		metrics: [
			{ value: "~43k", label: "lines of C++" },
			{ value: "×800", label: "two V100s vs one CPU core" },
			{ value: "1e-12", label: "GPU / CPU agreement" },
		],
		links: [
			{ label: "Live app", href: QUANT_APP_URL },
			{
				label: "Source",
				href: "https://github.com/HadrienT/quant-modeling",
			},
		],
		featured: true,
	},
	{
		name: "quant-platform",
		tagline: "Observability and audit for the pricing service.",
		description:
			"Kafka, an append-only audit store, and an OpenTelemetry collector " +
			"feeding Prometheus, Loki, Tempo and Grafana. Every valuation is " +
			"logged with its inputs and can be replayed exactly.",
		tags: ["Kafka", "OpenTelemetry", "Grafana", "Postgres"],
		metrics: [],
		links: [
			{
				label: "Source",
				href: "https://github.com/HadrienT/quant-platform",
			},
		],
	},
	{
		name: "data-ingest",
		tagline: "The market-data pipeline behind the pricers.",
		description:
			"Airflow DAGs loading prices, option chains, FRED curves, ICE BofA " +
			"credit spreads, SEC 10-K / 10-Q facts and DTCC swap and swaption " +
			"trades into Postgres.",
		tags: ["Airflow", "Postgres", "Python"],
		metrics: [],
		links: [],
	},
	{
		name: "Scripting assistant",
		tagline: "A local LLM that writes payoff scripts — checked by the parser.",
		description:
			"Describe a payoff in plain English; a self-hosted model drafts it in " +
			"quant-modeling's payoff language, and the real parser validates the " +
			"draft before it reaches the screen.",
		tags: ["LLM", "llama.cpp", "FastAPI"],
		metrics: [],
		links: [{ label: "Try it", href: `${QUANT_APP_URL}/scripting` }],
	},
];

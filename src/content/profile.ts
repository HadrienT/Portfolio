/**
 * Everything personal on the site lives here, so the copy can be edited
 * without touching a component.
 *
 * Strings starting with `TODO:` are placeholders still to be written; the test
 * in `content.test.ts` lists them, and `isPlaceholder` lets the UI flag them.
 */

export const PLACEHOLDER_PREFIX = "TODO:";

export const isPlaceholder = (text: string) =>
	text.startsWith(PLACEHOLDER_PREFIX);

export interface Link {
	label: string;
	href: string;
}

export interface Experience {
	role: string;
	company: string;
	location: string;
	period: string;
	summary: string;
	highlights: string[];
	stack: string[];
}

export interface Education {
	degree: string;
	school: string;
	period: string;
	detail: string;
}

export interface SkillGroup {
	name: string;
	items: string[];
}

export const profile = {
	name: "Hadrien Tramoni",
	headline: "Quant developer · C++ / GPU · ML systems",
	location: "TODO: City, Country",
	availability: "TODO: Open to quant developer and ML engineering roles",
	pitch:
		"I build pricing libraries the way a desk would — a C++20 core with " +
		"adjoint Greeks and GPU Monte Carlo — and carry them all the way to a " +
		"product people can use.",
	about: [
		"TODO: Two or three sentences on who you are and what you are looking for.",
		"TODO: One sentence on what you like to work on (performance, numerics, systems).",
	],
	email: "TODO: contact email",
	cv: "TODO: /cv.pdf",
	links: [
		{ label: "GitHub", href: "https://github.com/HadrienT" },
		{ label: "LinkedIn", href: "TODO: https://www.linkedin.com/in/..." },
	] satisfies Link[],
};

export const experience: Experience[] = [
	{
		role: "TODO: Job title",
		company: "TODO: Company",
		location: "TODO: City",
		period: "TODO: 2024 — now",
		summary: "TODO: One line on the team and what it does.",
		highlights: [
			"TODO: An achievement with a number (latency, P&L, coverage, users).",
			"TODO: A second achievement.",
		],
		stack: ["C++", "Python"],
	},
	{
		role: "TODO: Previous job title",
		company: "TODO: Company",
		location: "TODO: City",
		period: "TODO: 2022 — 2024",
		summary: "TODO: One line on the team and what it does.",
		highlights: ["TODO: An achievement with a number."],
		stack: ["TODO: Stack"],
	},
];

export const education: Education[] = [
	{
		degree: "TODO: Degree, major",
		school: "TODO: School",
		period: "TODO: 2019 — 2022",
		detail: "TODO: Relevant courses, ranking or thesis.",
	},
];

export const skills: SkillGroup[] = [
	{
		name: "Languages",
		items: ["C++20", "Python", "TypeScript", "CUDA", "SQL"],
	},
	{
		name: "Quant",
		items: [
			"Monte Carlo & variance reduction",
			"PDE / trees",
			"Stochastic & local vol calibration",
			"AAD",
			"xVA",
		],
	},
	{
		name: "Systems",
		items: ["CMake", "GoogleTest", "pybind11", "FastAPI", "Docker", "Kafka"],
	},
	{
		name: "ML & data",
		items: ["Local LLM serving", "Airflow", "Postgres", "OpenTelemetry"],
	},
];

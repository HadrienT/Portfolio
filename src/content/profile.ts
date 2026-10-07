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
	headline: "C++ / Python · quantitative finance · ML engineering",
	location: "France",
	availability: "Looking for a first quantitative developer role",
	pitch:
		"Software engineer with a machine-learning background, moving into " +
		"quantitative development. I have spent the past two years studying " +
		"derivatives pricing and building a C++20 pricing library to put it " +
		"into practice.",
	about: [
		"I trained as a computer-science engineer at ENSSAT, then worked for a " +
			"year as a machine learning engineer at Richemont, taking computer " +
			"vision and LLM prototypes to production.",
		"Since late 2024 I have been studying quantitative finance on my own, " +
			"from Hull and Shreve to Gatheral, Bergomi, Glasserman and Savine. " +
			"quant-modeling is where I implement what I read: I learn a method " +
			"by coding it and testing it against a closed form or a published " +
			"result. I built it with an AI coding assistant.",
		"I have not worked on a trading floor yet. I am looking for a first " +
			"quantitative developer role where I can learn from people who have, " +
			"and I enjoy numerical code, performance and careful testing.",
	],
	email: "tramonihadrien@gmail.com",
	/** Built from `CV/cv-public.tex` (no phone number) by `CV/build.sh`. */
	cv: "/cv.pdf",
	cvFilename: "Hadrien_Tramoni_CV.pdf",
	links: [
		{ label: "GitHub", href: "https://github.com/HadrienT" },
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/hadrien-tramoni/",
		},
	] satisfies Link[],
};

export const experience: Experience[] = [
	{
		role: "Independent study, quantitative finance",
		company: "Self-directed",
		location: "France",
		period: "Nov 2024 — now",
		summary:
			"Full-time study of derivatives pricing and numerical methods, " +
			"applied in the quant-modeling project.",
		highlights: [
			"Worked through Hull, Shreve, Gatheral, Bergomi, Glasserman and Savine.",
			"Implemented the methods in a C++20 pricing library: trees, PDE, Monte Carlo, calibration, adjoint Greeks, CUDA.",
		],
		stack: ["C++20", "CUDA", "Python"],
	},
	{
		role: "Machine Learning Engineer",
		company: "Richemont International SA",
		location: "Geneva",
		period: "Nov 2023 — Nov 2024",
		summary:
			"Computer vision and LLM document extraction, from research " +
			"prototype to production API.",
		highlights: [
			"Built a computer vision system that reads serial numbers from product images, reaching over 90% accuracy on in-group items.",
			"Applied LLMs (PaLM, Gemini) to extract structured data from unstructured documents; fine-tuned and evaluated the models on Vertex AI.",
			"Took the prototypes to production as an API on GCP Cloud Run, with the infrastructure managed in Terraform.",
			"Presented the results at Watches and Wonders 2024; managed a small team across several workstreams.",
		],
		stack: ["Python", "Vertex AI", "GCP Cloud Run", "Terraform"],
	},
];

export const education: Education[] = [
	{
		degree: "Engineering Degree in Computer Science",
		school: "ENSSAT, Lannion",
		period: "2020 — 2024",
		detail: "French Diplôme d'Ingénieur.",
	},
	{
		degree: "Exchange semester, Machine Learning and Computer Science",
		school: "IT University of Copenhagen",
		period: "Aug 2022 — Jan 2023",
		detail: "Semester abroad during the engineering degree.",
	},
	{
		degree: "Classes Préparatoires (CPGE), Mathematics and Physics",
		school: "Lycée Jean Dautet, La Rochelle",
		period: "2016 — 2020",
		detail: "Intensive undergraduate programme.",
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

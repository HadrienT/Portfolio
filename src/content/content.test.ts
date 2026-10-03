import { PLACEHOLDER_PREFIX, profile, experience, education } from "./profile";
import { projects } from "./projects";

/** Every string reachable from `value`, with its path. */
function strings(value: unknown, path: string): [string, string][] {
	if (typeof value === "string") return [[path, value]];
	if (Array.isArray(value))
		return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
	if (value && typeof value === "object")
		return Object.entries(value).flatMap(([k, v]) =>
			strings(v, `${path}.${k}`),
		);
	return [];
}

const all = strings({ profile, experience, education, projects }, "content");

describe("content", () => {
	it("lists the placeholders still to fill", () => {
		const todo = all.filter(([, s]) => s.startsWith(PLACEHOLDER_PREFIX));
		// Not a failure: a reminder in the test output until the copy is written.
		if (todo.length > 0) {
			console.info(
				`${todo.length} placeholder(s) left:\n` +
					todo.map(([p, s]) => `  ${p}: ${s}`).join("\n"),
			);
		}
		expect(Array.isArray(todo)).toBe(true);
	});

	it("never hides a TODO in the middle of a string", () => {
		const hidden = all.filter(
			([, s]) =>
				s.includes(PLACEHOLDER_PREFIX) && !s.startsWith(PLACEHOLDER_PREFIX),
		);
		expect(hidden).toEqual([]);
	});

	it("uses absolute https URLs for external links", () => {
		const hrefs = all
			.filter(([p]) => p.endsWith(".href"))
			.map(([, s]) => s)
			.filter((s) => !s.startsWith(PLACEHOLDER_PREFIX) && !s.startsWith("/"));
		for (const href of hrefs) expect(href).toMatch(/^https:\/\//);
	});
});

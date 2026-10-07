import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { App } from "./App";

beforeAll(() => {
	// jsdom lacks these; the hero canvas and the layout's scroll reset use them.
	window.matchMedia ??= ((query: string) => ({
		matches: false,
		media: query,
		addEventListener: () => {},
		removeEventListener: () => {},
	})) as unknown as typeof window.matchMedia;
	window.scrollTo = () => {};
	HTMLCanvasElement.prototype.getContext = () => null;
	globalThis.ResizeObserver ??= class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
});

const renderAt = (path: string) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<App />
		</MemoryRouter>,
	);

describe("App", () => {
	it("renders the home page sections", () => {
		renderAt("/");
		expect(
			screen.getByRole("heading", { level: 1, name: "Hadrien Tramoni" }),
		).toBeInTheDocument();
		for (const title of ["Things I have built", "Background", "Let's talk"]) {
			expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
		}
	});

	it("offers the résumé as a file download, not a route", () => {
		renderAt("/");
		const links = screen.getAllByRole("link", { name: /Résumé/ });
		expect(links.length).toBeGreaterThan(0);
		for (const link of links) {
			expect(link).toHaveAttribute("href", "/cv.pdf");
			expect(link).toHaveAttribute("download", "Hadrien_Tramoni_CV.pdf");
		}
	});

	it("renders the quant-modeling case study", () => {
		renderAt("/projects/quant-modeling");
		expect(
			screen.getByRole("heading", { level: 1, name: "quant-modeling" }),
		).toBeInTheDocument();
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("points lost visitors to the pricing app", () => {
		renderAt("/price");
		expect(screen.getByText("Page not found")).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "quant.tramonihadrien.com" }),
		).toHaveAttribute("href", "https://quant.tramonihadrien.com");
	});
});

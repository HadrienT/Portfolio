import { Link } from "react-router";
import { Container } from "@/components/Container";

export function NotFoundPage() {
	return (
		<Container className="py-32">
			<p className="font-mono text-xs tracking-wider text-accent uppercase">
				404
			</p>
			<h1 className="mt-2 text-3xl font-semibold text-ink">Page not found</h1>
			<p className="mt-4 text-ink-secondary">
				Looking for the pricing app? It moved to{" "}
				<a
					href="https://quant.tramonihadrien.com"
					className="text-accent hover:underline"
				>
					quant.tramonihadrien.com
				</a>
				.
			</p>
			<Link to="/" className="mt-8 inline-block text-sm text-accent">
				← Back home
			</Link>
		</Container>
	);
}

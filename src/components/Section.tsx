import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
	id,
	eyebrow,
	title,
	children,
}: {
	id: string;
	eyebrow: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<section id={id} className="scroll-mt-16 py-16 sm:py-20">
			<Container>
				<p className="font-mono text-xs tracking-wider text-accent uppercase">
					{eyebrow}
				</p>
				<h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
					{title}
				</h2>
				<div className="mt-10">{children}</div>
			</Container>
		</section>
	);
}

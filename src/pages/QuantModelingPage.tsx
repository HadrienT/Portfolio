import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { QUANT_APP_URL, projects } from "@/content/projects";
import { gpuBench, layers, pillars } from "@/content/quantModeling";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";

const project = projects.find((p) => p.slug === "quant-modeling")!;

export function QuantModelingPage() {
	return (
		<article>
			<header className="border-b border-line">
				<Container className="py-16 sm:py-24">
					<Link to="/#projects" className="text-sm text-ink-muted">
						← All projects
					</Link>
					<p className="mt-8 font-mono text-xs tracking-wider text-accent uppercase">
						Case study
					</p>
					<h1 className="mt-2 font-mono text-3xl font-medium tracking-tight text-ink sm:text-5xl">
						quant-modeling
					</h1>
					<p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
						A derivatives pricing library that keeps instruments, models and
						engines apart, carried through to a web app. A personal project,
						built with an AI coding assistant to put my self-study into
						practice.
					</p>
					<div className="mt-6 flex flex-wrap gap-1.5">
						{project.tags.map((t) => (
							<Tag key={t}>{t}</Tag>
						))}
					</div>
					<div className="mt-8 flex flex-wrap gap-3">
						{project.links.map((l, i) => (
							<a
								key={l.href}
								href={l.href}
								target="_blank"
								rel="noreferrer"
								className={
									i === 0
										? "inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-canvas hover:opacity-90"
										: "inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:border-ink-muted"
								}
							>
								{l.label}
								<ArrowUpRight className="size-4" />
							</a>
						))}
					</div>
				</Container>
			</header>

			<Container className="py-16">
				<h2 className="text-xl font-semibold text-ink">The chain</h2>
				<ol className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
					{layers.map((layer, i) => (
						<li
							key={layer.name}
							className="relative rounded-lg border border-line bg-surface p-4"
						>
							<p className="font-mono text-xs text-ink-muted">0{i + 1}</p>
							<p className="mt-1 font-mono text-sm font-medium text-ink">
								{layer.name}
							</p>
							<p className="mt-2 text-xs leading-relaxed text-ink-secondary">
								{layer.detail}
							</p>
						</li>
					))}
				</ol>

				<h2 className="mt-16 text-xl font-semibold text-ink">
					Where the depth is
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
					{pillars.map((p) => (
						<section key={p.title}>
							<h3 className="text-base font-semibold text-ink">{p.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-ink-secondary">
								{p.body}
							</p>
						</section>
					))}
				</div>

				<h2 className="mt-16 text-xl font-semibold text-ink">GPU benchmark</h2>
				<p className="mt-2 max-w-2xl text-sm text-ink-secondary">
					Wall time to a 1e-4 relative standard error, pseudo-random paths. The
					CPU columns run the kernels' own per-path code; the longest CPU runs
					were timed on a fraction and scaled.
				</p>
				<div className="mt-6 overflow-x-auto rounded-lg border border-line">
					<table className="w-full text-left text-sm">
						<thead className="bg-surface font-mono text-xs text-ink-muted">
							<tr>
								<th className="px-4 py-3 font-normal">Product</th>
								<th className="px-4 py-3 text-right font-normal">CPU ×1</th>
								<th className="hidden px-4 py-3 text-right font-normal sm:table-cell">
									CPU ×8
								</th>
								<th className="hidden px-4 py-3 text-right font-normal sm:table-cell">
									1 V100
								</th>
								<th className="px-4 py-3 text-right font-normal">2 V100</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-line font-mono text-xs whitespace-nowrap">
							{gpuBench.map((r) => (
								<tr key={r.product}>
									<td className="px-4 py-3 font-sans text-sm text-ink">
										{r.product}
									</td>
									<td className="px-4 py-3 text-right text-ink-muted">
										{r.cpu1}
									</td>
									<td className="hidden px-4 py-3 text-right text-ink-muted sm:table-cell">
										{r.cpu8}
									</td>
									<td className="hidden px-4 py-3 text-right text-ink-secondary sm:table-cell">
										{r.gpu1}
									</td>
									<td className="px-4 py-3 text-right font-medium text-accent">
										{r.gpu2}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-16 rounded-xl border border-line bg-surface p-6 sm:p-8">
					<h2 className="text-lg font-semibold text-ink">Try it</h2>
					<p className="mt-2 text-sm text-ink-secondary">
						The app runs on my own server: price an option, script a payoff, or
						compute the CVA of a netting set — no account needed.
					</p>
					<a
						href={QUANT_APP_URL}
						target="_blank"
						rel="noreferrer"
						className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
					>
						quant.tramonihadrien.com
						<ArrowUpRight className="size-4" />
					</a>
				</div>
			</Container>
		</article>
	);
}

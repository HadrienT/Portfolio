import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { projects, type Project } from "@/content/projects";
import { Section } from "@/components/Section";
import { SmartLink } from "@/components/SmartLink";
import { Tag } from "@/components/Tag";

function ProjectCard({ project }: { project: Project }) {
	return (
		<article
			className={clsx(
				"flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink-muted/60",
				project.featured && "md:col-span-2",
			)}
		>
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="font-mono text-lg font-medium text-ink">
					{project.name}
				</h3>
				{project.featured && (
					<span className="font-mono text-[11px] tracking-wider text-accent uppercase">
						Flagship
					</span>
				)}
			</div>
			<p className="mt-1 text-sm font-medium text-ink-secondary">
				{project.tagline}
			</p>
			<p className="mt-3 text-sm leading-relaxed text-ink-secondary">
				{project.description}
			</p>

			{project.metrics.length > 0 && (
				<dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-4">
					{project.metrics.map((m) => (
						<div key={m.label}>
							<dt className="sr-only">{m.label}</dt>
							<dd className="font-mono text-xl font-medium text-ink sm:text-2xl">
								{m.value}
							</dd>
							<dd className="mt-1 text-xs text-ink-muted">{m.label}</dd>
						</div>
					))}
				</dl>
			)}

			<div className="mt-5 flex flex-wrap gap-1.5">
				{project.tags.map((t) => (
					<Tag key={t}>{t}</Tag>
				))}
			</div>

			{(project.slug || project.links.length > 0) && (
				<div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm">
					{project.slug && (
						<SmartLink
							href={`/projects/${project.slug}`}
							className="font-medium text-accent hover:underline"
						>
							Read the case study →
						</SmartLink>
					)}
					{project.links.map((l) => (
						<SmartLink
							key={l.href}
							href={l.href}
							className="inline-flex items-center gap-1 text-ink-secondary hover:text-ink"
						>
							{l.label}
							<ArrowUpRight className="size-3.5" />
						</SmartLink>
					))}
				</div>
			)}
		</article>
	);
}

export function Projects() {
	return (
		<Section id="projects" eyebrow="Projects" title="Things I have built">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{projects.map((p) => (
					<ProjectCard key={p.name} project={p} />
				))}
			</div>
		</Section>
	);
}

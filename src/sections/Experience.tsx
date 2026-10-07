import { education, experience } from "@/content/profile";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { Text } from "@/components/Text";

export function Experience() {
	return (
		<Section id="experience" eyebrow="Experience" title="Background">
			<ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
				{experience.map((job, i) => (
					<li key={i} className="relative">
						<span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-canvas bg-accent sm:-left-[37px]" />
						<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
							<h3 className="text-base font-semibold text-ink">
								<Text>{job.role}</Text>
								<span className="font-normal text-ink-muted"> · </span>
								<Text>{job.company}</Text>
							</h3>
							<p className="font-mono text-xs text-ink-muted">
								<Text>{job.period}</Text>
								{" · "}
								<Text>{job.location}</Text>
							</p>
						</div>
						<p className="mt-2 text-sm text-ink-secondary">
							<Text>{job.summary}</Text>
						</p>
						<ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-secondary marker:text-ink-muted">
							{job.highlights.map((h) => (
								<li key={h}>
									<Text>{h}</Text>
								</li>
							))}
						</ul>
						<div className="mt-3 flex flex-wrap gap-1.5">
							{job.stack.map((s) => (
								<Tag key={s}>{s}</Tag>
							))}
						</div>
					</li>
				))}
			</ol>

			<h3 className="mt-16 font-mono text-xs tracking-wider text-accent uppercase">
				Education
			</h3>
			<ul className="mt-6 space-y-6">
				{education.map((e, i) => (
					<li
						key={i}
						className="flex flex-col gap-1 sm:flex-row sm:justify-between"
					>
						<div>
							<p className="text-base font-semibold text-ink">
								<Text>{e.degree}</Text>
							</p>
							<p className="text-sm text-ink-secondary">
								<Text>{e.school}</Text>
								{" — "}
								<Text>{e.detail}</Text>
							</p>
						</div>
						<p className="font-mono text-xs text-ink-muted">
							<Text>{e.period}</Text>
						</p>
					</li>
				))}
			</ul>
		</Section>
	);
}

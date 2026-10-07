import { ArrowRight, Download, Github } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/Container";
import { PathsCanvas } from "@/components/PathsCanvas";
import { SmartLink } from "@/components/SmartLink";
import { Text } from "@/components/Text";

export function Hero() {
	const github = profile.links.find((l) => l.label === "GitHub");
	return (
		<section className="relative overflow-hidden border-b border-line">
			<PathsCanvas className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent,black_45%)] opacity-25 sm:opacity-70 sm:dark:opacity-80" />
			<Container className="relative py-24 sm:py-32">
				<p className="font-mono text-xs tracking-wider text-accent uppercase">
					{profile.headline}
				</p>
				<h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
					{profile.name}
				</h1>
				<p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">
					{profile.pitch}
				</p>
				<p className="mt-4 text-sm text-ink-muted">
					<Text>{profile.availability}</Text>
					{" · "}
					<Text>{profile.location}</Text>
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<a
						href="#projects"
						className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
					>
						See my work
						<ArrowRight className="size-4" />
					</a>
					<SmartLink
						href={profile.cv}
						download={profile.cvFilename}
						className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-muted"
					>
						<Download className="size-4" />
						Résumé
					</SmartLink>
					{github && (
						<SmartLink
							href={github.href}
							className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-muted"
						>
							<Github className="size-4" />
							GitHub
						</SmartLink>
					)}
				</div>
			</Container>
		</section>
	);
}

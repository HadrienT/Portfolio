import { ArrowRight, Download, Github } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/Container";
import { HERO_MODEL, PathsCanvas } from "@/components/PathsCanvas";
import { SmartLink } from "@/components/SmartLink";
import { Text } from "@/components/Text";

export function Hero() {
	const github = profile.links.find((l) => l.label === "GitHub");
	return (
		<section className="relative overflow-hidden border-b border-line">
			{/* The paths fill the top band; the text sits below it, clear of them. */}
			<PathsCanvas className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full [mask-image:linear-gradient(to_right,transparent,black_20%),linear-gradient(to_bottom,black_75%,transparent)] [mask-composite:intersect] sm:h-80" />
			<Container className="relative pt-60 pb-20 sm:pt-80 sm:pb-24">
				<p
					aria-hidden="true"
					className="absolute top-5 right-4 hidden items-center gap-4 rounded-md bg-canvas/85 px-2.5 py-1.5 font-mono text-[11px] text-ink-secondary backdrop-blur-sm sm:right-6 sm:flex"
				>
					<span className="flex items-center gap-1.5">
						<span className="h-0.5 w-5 rounded bg-accent" />
						mean of {HERO_MODEL.count} paths
					</span>
					<span className="flex items-center gap-1.5">
						<span className="w-5 border-t-[1.5px] border-dashed border-ink" />
						E[Sₜ] = S₀e<sup className="text-[9px] leading-none">μt</sup>
					</span>
				</p>
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

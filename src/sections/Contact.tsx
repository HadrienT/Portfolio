import { ArrowUpRight, Download, Mail } from "lucide-react";
import { isPlaceholder, profile } from "@/content/profile";
import { Section } from "@/components/Section";
import { SmartLink } from "@/components/SmartLink";
import { Text } from "@/components/Text";

export function Contact() {
	const mailto = isPlaceholder(profile.email)
		? profile.email
		: `mailto:${profile.email}`;
	return (
		<Section id="contact" eyebrow="Contact" title="Let's talk">
			<p className="max-w-xl text-base leading-relaxed text-ink-secondary">
				I am looking for a first quantitative developer role. The fastest way to
				reach me is by email.
			</p>
			<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
				<SmartLink
					href={mailto}
					className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
				>
					<Mail className="size-4" />
					<Text>{profile.email}</Text>
				</SmartLink>
				<SmartLink
					href={profile.cv}
					download={profile.cvFilename}
					className="inline-flex items-center gap-1 text-sm text-ink-secondary hover:text-ink"
				>
					Résumé (PDF)
					<Download className="size-3.5" />
				</SmartLink>
				{profile.links.map((l) => (
					<SmartLink
						key={l.label}
						href={l.href}
						className="inline-flex items-center gap-1 text-sm text-ink-secondary hover:text-ink"
					>
						{l.label}
						<ArrowUpRight className="size-3.5" />
					</SmartLink>
				))}
			</div>
		</Section>
	);
}

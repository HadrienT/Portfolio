import { profile } from "@/content/profile";
import { Section } from "@/components/Section";
import { Text } from "@/components/Text";

export function About() {
	return (
		<Section id="about" eyebrow="About" title="What I do">
			<div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-secondary">
				{profile.about.map((paragraph) => (
					<p key={paragraph}>
						<Text>{paragraph}</Text>
					</p>
				))}
			</div>
		</Section>
	);
}

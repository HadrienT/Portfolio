import { skills } from "@/content/profile";
import { Section } from "@/components/Section";

export function Skills() {
	return (
		<Section id="skills" eyebrow="Skills" title="Toolbox">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{skills.map((group) => (
					<div key={group.name}>
						<h3 className="text-sm font-semibold text-ink">{group.name}</h3>
						<ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
							{group.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</Section>
	);
}

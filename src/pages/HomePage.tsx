import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

export function HomePage() {
	return (
		<>
			<Hero />
			<About />
			<Projects />
			<Experience />
			<Skills />
			<Contact />
		</>
	);
}

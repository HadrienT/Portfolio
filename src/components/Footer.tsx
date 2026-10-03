import { profile } from "@/content/profile";
import { Container } from "./Container";

export function Footer() {
	return (
		<footer className="border-t border-line py-8">
			<Container className="flex flex-col gap-2 text-xs text-ink-muted sm:flex-row sm:justify-between">
				<p>
					© {new Date().getFullYear()} {profile.name}
				</p>
				<p>Self-hosted. React + Vite, served by nginx behind Cloudflare.</p>
			</Container>
		</footer>
	);
}

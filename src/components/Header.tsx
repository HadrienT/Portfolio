import { Link } from "react-router";
import { profile } from "@/content/profile";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
	{ label: "Projects", to: "/#projects" },
	{ label: "Experience", to: "/#experience" },
	{ label: "Contact", to: "/#contact" },
];

export function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur">
			<Container className="flex h-14 items-center justify-between gap-4">
				<Link
					to="/"
					className="font-mono text-sm font-medium tracking-tight text-ink"
				>
					{profile.name.toLowerCase().replace(" ", ".")}
				</Link>
				<nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
					{NAV.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="hidden rounded px-2 py-1 text-sm text-ink-secondary transition-colors hover:text-ink sm:inline"
						>
							{item.label}
						</Link>
					))}
					<ThemeToggle />
				</nav>
			</Container>
		</header>
	);
}

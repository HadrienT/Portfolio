import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const [dark, setDark] = useState(() =>
		document.documentElement.classList.contains("dark"),
	);

	const toggle = () => {
		const next = !dark;
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {
			/* storage blocked: the choice lasts for this page only */
		}
		setDark(next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
			className="rounded-md p-2 text-ink-secondary transition-colors hover:bg-surface hover:text-ink"
		>
			{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
		</button>
	);
}

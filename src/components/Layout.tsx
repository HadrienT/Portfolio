import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
	const { pathname, hash } = useLocation();

	// Route changes start at the top, unless the URL targets an anchor.
	useEffect(() => {
		if (hash) {
			document.getElementById(hash.slice(1))?.scrollIntoView();
		} else {
			window.scrollTo(0, 0);
		}
	}, [pathname, hash]);

	return (
		<div className="flex min-h-dvh flex-col">
			<a
				href="#main"
				className="sr-only rounded bg-accent px-3 py-2 text-canvas focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
			>
				Skip to content
			</a>
			<Header />
			<main id="main" className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

// Runs before first paint (external file, so the CSP needs no 'unsafe-inline').
// Applies the saved theme, or the system preference when none was chosen.
(function () {
	var saved = null;
	try {
		saved = localStorage.getItem("theme");
	} catch (e) {
		/* storage blocked: fall back to the system preference */
	}
	var dark =
		saved === "dark" ||
		(saved !== "light" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);
	document.documentElement.classList.toggle("dark", dark);
})();

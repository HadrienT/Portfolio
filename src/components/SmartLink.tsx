import type { ReactNode } from "react";
import { Link } from "react-router";
import { isPlaceholder } from "@/content/profile";

/**
 * An internal route, an external URL (web links open in a new tab), or — for a `TODO:` href —
 * plain text, so a placeholder never becomes a broken link.
 */
export function SmartLink({
	href,
	className,
	children,
}: {
	href: string;
	className?: string;
	children: ReactNode;
}) {
	if (isPlaceholder(href)) {
		return (
			<span className={className} aria-disabled="true">
				{children}
			</span>
		);
	}
	if (href.startsWith("/")) {
		return (
			<Link to={href} className={className}>
				{children}
			</Link>
		);
	}
	const newTab = /^https?:/.test(href);
	return (
		<a
			href={href}
			className={className}
			{...(newTab && { target: "_blank", rel: "noreferrer" })}
		>
			{children}
		</a>
	);
}

import clsx from "clsx";
import { PLACEHOLDER_PREFIX, isPlaceholder } from "@/content/profile";

/**
 * Renders a content string; a `TODO:` placeholder is shown highlighted, so an
 * unfinished field cannot go unnoticed on a screenshot or in review.
 */
export function Text({
	children,
	className,
}: {
	children: string;
	className?: string;
}) {
	if (!isPlaceholder(children)) {
		return <span className={className}>{children}</span>;
	}
	return (
		<span
			className={clsx(
				"rounded-sm bg-warn-soft px-1 text-warn decoration-dashed",
				className,
			)}
			title="Placeholder — edit src/content"
		>
			{children.slice(PLACEHOLDER_PREFIX.length).trim()}
		</span>
	);
}

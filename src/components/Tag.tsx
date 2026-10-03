import { Text } from "./Text";

export function Tag({ children }: { children: string }) {
	return (
		<span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink-secondary">
			<Text>{children}</Text>
		</span>
	);
}

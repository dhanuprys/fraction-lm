/* ────────────────────────────── helpers ──────────────────────────────── */

/** Shortcut to build a TipTap `doc` node. */
export function doc(...content: unknown[]) {
	return { type: 'doc', content };
}

/** Paragraph with plain text. */
export function p(...texts: (string | object)[]) {
	return {
		type: 'paragraph',
		content: texts.map((t) =>
			typeof t === 'string' ? { type: 'text', text: t } : t,
		),
	};
}

/** Bold text node. */
export function bold(text: string) {
	return { type: 'text', text, marks: [{ type: 'bold' }] };
}

/** Italic text node. */
export function italic(text: string) {
	return { type: 'text', text, marks: [{ type: 'italic' }] };
}

/** Heading node. */
export function heading(level: number, text: string) {
	return {
		type: 'heading',
		attrs: { level },
		content: [{ type: 'text', text }],
	};
}

/** LaTeX block math node. */
export function math(latex: string) {
	return { type: 'math', attrs: { latex } };
}

/** Bullet list from string items. */
export function bulletList(...items: string[]) {
	return {
		type: 'bulletList',
		content: items.map((item) => ({
			type: 'listItem',
			content: [p(item)],
		})),
	};
}

/** Ordered list from string items. */
export function orderedList(...items: string[]) {
	return {
		type: 'orderedList',
		content: items.map((item) => ({
			type: 'listItem',
			content: [p(item)],
		})),
	};
}

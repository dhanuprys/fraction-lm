/**
 * Asset Scanner Utility
 *
 * Recursively walks JSON structures (TipTap rich text, Question answers, etc.)
 * to extract and normalize all asset paths referencing /uploads/.
 *
 * Key behavior:
 * - Direct fields (e.g. Topic.thumbnail) store relative paths: /uploads/uuid.blob
 * - TipTap JSON stores FULL URLs: http://localhost:3000/uploads/uuid.blob
 * - This scanner normalizes everything to relative /uploads/... paths IN-PLACE
 *   so the exported data is host-agnostic and portable across deployments.
 */

const UPLOADS_PATTERN = /\/uploads\/[^\s"'<>]+/;

/**
 * Recursively walks a JSON object tree, finds all /uploads/ references,
 * collects them into a Set, and normalizes full URLs to relative paths in-place.
 *
 * @param obj - Any JSON-serializable value (TipTap doc, answers array, etc.)
 * @returns Set of relative asset paths like "/uploads/abc123.blob"
 */
export function extractAndNormalizeAssets(obj: unknown): Set<string> {
	const paths = new Set<string>();

	function walk(node: unknown): void {
		if (!node || typeof node !== 'object') return;

		if (Array.isArray(node)) {
			for (const item of node) walk(item);
			return;
		}

		const record = node as Record<string, unknown>;

		for (const [key, value] of Object.entries(record)) {
			if (typeof value === 'string' && value.includes('/uploads/')) {
				const match = value.match(UPLOADS_PATTERN);
				if (match) {
					const relativePath = match[0];
					paths.add(relativePath);
					// Normalize full URL → relative path in-place
					// e.g. "http://localhost:3000/uploads/abc.blob" → "/uploads/abc.blob"
					record[key] = relativePath;
				}
			} else if (typeof value === 'object' && value !== null) {
				walk(value);
			}
		}
	}

	walk(obj);
	return paths;
}

/**
 * Collects asset paths from a direct string field (like Topic.thumbnail).
 * Does NOT mutate — these are already stored as relative paths.
 *
 * @param path - A thumbnail path like "/uploads/uuid.blob" or null/undefined
 * @returns The path if it's a valid upload reference, otherwise null
 */
export function collectDirectAssetPath(
	path: string | null | undefined,
): string | null {
	if (!path) return null;
	const match = path.match(UPLOADS_PATTERN);
	return match ? match[0] : null;
}

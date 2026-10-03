interface ScoringInput {
	hintsUsed: number;
	attemptsCount: number;
	timeToSolveSeconds: number;
	difficulty: number;
}

export function calculateMasteryScore(input: ScoringInput): number {
	const BASE_SCORE = 100;
	const HINT_PENALTY = 5;
	const ATTEMPT_PENALTY = 5;

	let score = BASE_SCORE;

	// Predictable, gentle point deductions
	score -= input.hintsUsed * HINT_PENALTY;
	score -= Math.max(0, input.attemptsCount - 1) * ATTEMPT_PENALTY;

	// Keep a very forgiving minimum score of 50
	return Math.max(50, Math.min(100, score));
}

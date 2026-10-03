// ──────────────────────────────────────────────────────────────
// Sound Configuration — Single source of truth for all audio
// ──────────────────────────────────────────────────────────────

/**
 * All sound file paths live here.
 * When you add a new audio file to /public/sounds/, register it below.
 */

// ── Background Music (BGM) ──────────────────────────────────
export const BGM = {
  LANDING: "/sounds/bgm/landing.mp3",
  DASHBOARD: "/sounds/bgm/dashboard.mp3",
  QUIZ: "/sounds/bgm/quiz.mp3",
  RESULT: "/sounds/bgm/result.mp3",
} as const;

// ── Sound Effects (SFX) ─────────────────────────────────────
export const SFX = {
  CLICK: "/sounds/sfx/click.wav",
  SUCCESS: "/sounds/sfx/success.mp3",
  ERROR: "/sounds/sfx/error.mp3",
  BLOCKED: "/sounds/sfx/blocked.wav",
  NOTIFICATION: "/sounds/sfx/notification.mp3",
  LEVEL_UP: "/sounds/sfx/level-up.mp3",
  TIPS: "/sounds/sfx/tips.mp3",
  VICTORY: "/sounds/sfx/victory.mp3",
} as const;

// ── Derived types so the store stays type-safe ──────────────
export type BGMTrack = (typeof BGM)[keyof typeof BGM];
export type SFXName = keyof typeof SFX;

// ── Tuning knobs (tweak these, not the store) ───────────────
export const SOUND_CONFIG = {
  /** Maximum volume for background music (0–1). Keep low so it doesn't overpower UI. */
  BGM_MAX_VOLUME: 0.35,

  /** Duration in ms for a full fade-in or fade-out. */
  FADE_DURATION_MS: 800,

  /** How often the fade ticks (smaller = smoother, but more CPU). */
  FADE_INTERVAL_MS: 30,

  /** Default volume for one-shot SFX (0–1). */
  SFX_VOLUME: 0.6,
} as const;

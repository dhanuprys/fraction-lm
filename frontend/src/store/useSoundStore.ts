import { create } from "zustand";
import { type BGMTrack, type SFXName, SFX, SOUND_CONFIG } from "../config/sound.config";

// ── Internal helpers ────────────────────────────────────────

// Keep track of active fade intervals per audio element so they don't fight.
const _activeFades = new WeakMap<HTMLAudioElement, ReturnType<typeof setInterval>>();

/** Smoothly ramp an audio element's volume from its current value to `target`. */
function fadeVolume(audio: HTMLAudioElement, target: number, onDone?: () => void) {
  // Cancel any existing fade on THIS audio element
  const existing = _activeFades.get(audio);
  if (existing) clearInterval(existing);

  const { FADE_DURATION_MS, FADE_INTERVAL_MS } = SOUND_CONFIG;
  const steps = Math.ceil(FADE_DURATION_MS / FADE_INTERVAL_MS);
  const delta = (target - audio.volume) / steps;
  let remaining = steps;

  const intervalId = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      audio.volume = Math.max(0, Math.min(target, 1));
      _activeFades.delete(audio);
      onDone?.();
      clearInterval(intervalId);
      return;
    }
    audio.volume = Math.max(0, Math.min(audio.volume + delta, 1));
  }, FADE_INTERVAL_MS);

  _activeFades.set(audio, intervalId);
}

// ── Store types ─────────────────────────────────────────────

interface SoundState {
  /** Global mute flag — affects both BGM and SFX. */
  isMuted: boolean;
  /** The track key currently playing (null = silence). */
  currentBGMTrack: BGMTrack | null;

  // ── Actions ──
  init: () => void;
  toggleMute: () => void;
  playSFX: (name: SFXName) => void;
  playBGM: (track: BGMTrack) => void;
  stopBGM: () => void;
}

// ── Internal refs (not in Zustand state to avoid re-renders) ─

/** Currently-playing BGM element. */
let _bgmAudio: HTMLAudioElement | null = null;
/** Pre-created BGM pool: one Audio element per BGM key to prevent memory leaks. */
const _bgmPool = new Map<BGMTrack, HTMLAudioElement>();
/** Pre-created SFX pool: one Audio element per SFX key. */
const _sfxPool = new Map<SFXName, HTMLAudioElement>();

// ── Store ───────────────────────────────────────────────────

export const useSoundStore = create<SoundState>((set, get) => ({
  isMuted: false,
  currentBGMTrack: null,

  // ── Initialisation (call once on app mount) ───────────────
  init: () => {
    if (_sfxPool.size > 0) return; // already initialised

    // Pre-create an Audio element for every SFX so first play is instant
    for (const [key, path] of Object.entries(SFX)) {
      const audio = new Audio(path);
      audio.volume = SOUND_CONFIG.SFX_VOLUME;
      _sfxPool.set(key as SFXName, audio);
    }

    // Mute all audio when tab loses focus, and restore when it regains focus
    document.addEventListener("visibilitychange", () => {
      const isMuted = get().isMuted;
      const shouldMute = document.hidden || isMuted;

      if (_bgmAudio) _bgmAudio.muted = shouldMute;
      for (const audio of _sfxPool.values()) audio.muted = shouldMute;
      for (const audio of _bgmPool.values()) audio.muted = shouldMute;
    });
  },

  // ── Mute / Unmute everything ──────────────────────────────
  toggleMute: () => {
    const next = !get().isMuted;
    const shouldMute = document.hidden || next;

    if (_bgmAudio) _bgmAudio.muted = shouldMute;
    for (const audio of _sfxPool.values()) audio.muted = shouldMute;
    for (const audio of _bgmPool.values()) audio.muted = shouldMute;

    set({ isMuted: next });
  },

  // ── One-shot sound effects ────────────────────────────────
  playSFX: (name: SFXName) => {
    if (get().isMuted || document.hidden) return;

    const audio = _sfxPool.get(name);
    if (!audio) {
      console.warn(`[Sound] SFX "${name}" not found in pool`);
      return;
    }
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("[Sound] SFX play failed:", err));
  },

  // ── Background music with crossfade ───────────────────────
  playBGM: (track: BGMTrack) => {
    const { isMuted, currentBGMTrack } = get();

    // Already playing this track — no-op
    if (currentBGMTrack === track && _bgmAudio && !_bgmAudio.paused) return;

    // ── Fade out old track ──
    const oldAudio = _bgmAudio;
    if (oldAudio) {
      fadeVolume(oldAudio, 0, () => {
        oldAudio.pause();
        oldAudio.currentTime = 0;
      });
    }

    // ── Fade in new track ──
    let newAudio = _bgmPool.get(track);
    if (!newAudio) {
      newAudio = new Audio(track);
      newAudio.loop = true;
      _bgmPool.set(track, newAudio);
    }

    newAudio.muted = isMuted || document.hidden;
    newAudio.volume = 0;

    newAudio.play().catch((err) => {
      console.warn("[Sound] BGM play failed:", err.name);
      if (err.name === "NotAllowedError") {
        const resumeAudio = () => {
          if (get().currentBGMTrack === track && _bgmAudio === newAudio) {
            newAudio.play().catch(() => {});
          }
          document.removeEventListener("click", resumeAudio);
          document.removeEventListener("keydown", resumeAudio);
        };
        document.addEventListener("click", resumeAudio, { once: true });
        document.addEventListener("keydown", resumeAudio, { once: true });
      }
    });

    fadeVolume(newAudio, SOUND_CONFIG.BGM_MAX_VOLUME);

    _bgmAudio = newAudio;
    set({ currentBGMTrack: track });
  },

  // ── Stop BGM (fade out then silence) ──────────────────────
  stopBGM: () => {
    if (!_bgmAudio) return;

    const audio = _bgmAudio;
    fadeVolume(audio, 0, () => {
      audio.pause();
      audio.currentTime = 0;
    });

    _bgmAudio = null;
    set({ currentBGMTrack: null });
  },
}));

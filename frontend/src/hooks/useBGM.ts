import { useEffect } from "react";
import { useSoundStore } from "@/store/useSoundStore";
import type { BGMTrack } from "@/config/sound.config";

/**
 * A handy hook to manage background music on a per-page basis.
 * @param track The BGM track to play. If undefined, stops any currently playing BGM.
 * @param stopOnUnmount If true, the BGM will be stopped when the component unmounts.
 */
export function useBGM(track?: BGMTrack, stopOnUnmount = false) {
  const playBGM = useSoundStore((s) => s.playBGM);
  const stopBGM = useSoundStore((s) => s.stopBGM);

  useEffect(() => {
    if (track) {
      playBGM(track);
    } else {
      stopBGM();
    }

    if (stopOnUnmount) {
      return () => stopBGM();
    }
  }, [track, playBGM, stopBGM, stopOnUnmount]);
}

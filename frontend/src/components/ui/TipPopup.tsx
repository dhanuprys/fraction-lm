import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/ui/AIAvatar";
import { tipsConfig } from "@/config/tips.config";
import { X } from "lucide-react";
import { useSoundStore } from "@/store/useSoundStore";

export function TipPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [tip, setTip] = useState("");
  const lastTipRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const isHiddenView = location.pathname.split("/").filter(Boolean).length >= 5;

  useEffect(() => {
    if (isHiddenView) {
      setIsVisible(false);
    }
  }, [isHiddenView]);

  const SHOW_DURATION = 15000;

  const scheduleShow = () => {
    // Show a new tip between 45 to 90 seconds after the previous one was hidden
    const delay = Math.floor(Math.random() * 45000) + 45000;
    timerRef.current = setTimeout(() => {
      let newTip = "";
      do {
        newTip = tipsConfig[Math.floor(Math.random() * tipsConfig.length)];
      } while (newTip === lastTipRef.current && tipsConfig.length > 1);

      lastTipRef.current = newTip;
      setTip(newTip);
      setIsVisible(true);

      try {
        useSoundStore.getState().playSFX("TIPS");
      } catch (e) {
        // ignore
      }

      scheduleHide();
    }, delay);
  };

  const scheduleHide = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      scheduleShow();
    }, SHOW_DURATION);
  };

  useEffect(() => {
    // Initial start: delay 15-30s
    const initialDelay = Math.floor(Math.random() * 15000) + 15000;
    timerRef.current = setTimeout(() => {
      const newTip = tipsConfig[Math.floor(Math.random() * tipsConfig.length)];
      lastTipRef.current = newTip;
      setTip(newTip);
      setIsVisible(true);

      try {
        useSoundStore.getState().playSFX("TIPS");
      } catch (e) {
        // ignore
      }

      scheduleHide();
    }, initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    scheduleShow();
  };

  return (
    <AnimatePresence>
      {isVisible && !isHiddenView && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-[calc(100vw-3rem)] md:w-auto"
        >
          <div className="flex gap-4 items-start bg-surface p-5 rounded-3xl shadow-2xl shadow-[var(--orange)]/15 border border-[var(--separator)] overflow-hidden relative">
            <AIAvatar state="idea" size="md" className="drop-shadow-sm mt-1 shrink-0" />
            <div className="flex-1 min-w-0 z-10 mb-2">
              <p className="text-base font-bold text-ink mb-1.5">Tahukah kamu?</p>
              <p className="text-base text-muted leading-relaxed">{tip}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-muted hover:text-ink transition-colors flex-shrink-0 -mt-2 -mr-2 p-2 rounded-full hover:bg-[var(--bg)] z-10 relative"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Auto-hide progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: SHOW_DURATION / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1.5 bg-[var(--orange)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

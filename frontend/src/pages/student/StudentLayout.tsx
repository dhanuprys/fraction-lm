import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/pouf/Button";
import { Navbar } from "@/components/pouf/navbar";
import { Progress } from "@/components/pouf/progress";
import { useAuthStore } from "@/store/useAuthStore";
import { Confirm } from "@/components/pouf/controls";
import { useSoundStore } from "@/store/useSoundStore";
import { Volume2, VolumeX } from "lucide-react";
import dashboardBg from "@/assets/images/bg/dashboard.png";
import topicBg from "@/assets/images/bg/topic.png";
import exerciseBg from "@/assets/images/bg/exercise.png";
import splashBg from "@/assets/images/bg/splash.png";
import logoRectangle from "@/assets/images/bg/logo-rectangle.png";
import { TipPopup } from "@/components/ui/TipPopup";

export default function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isMuted = useSoundStore((s) => s.isMuted);
  const toggleMute = useSoundStore((s) => s.toggleMute);
  const playSFX = useSoundStore((s) => s.playSFX);

  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSplashProgress((p) => {
        const next = p + 8;
        if (next >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    playSFX("CLICK");
    setFadeSplash(true);
    setTimeout(() => setShowSplash(false), 500);
  };

  const isDashboard =
    location.pathname === "/student" ||
    location.pathname === "/student/dashboard" ||
    location.pathname === "/student/";
  const isExerciseView = location.pathname.endsWith("/exercise");
  const isTopicView = location.pathname.startsWith("/student/topics") && !isExerciseView;

  let bgUrl = "";
  if (isDashboard) bgUrl = dashboardBg;
  else if (isTopicView) bgUrl = topicBg;
  else if (isExerciseView) bgUrl = exerciseBg;

  return (
    <>
      {showSplash && (
        <div
          className={`fixed inset-0 z-[100] bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${fadeSplash ? "opacity-0" : "opacity-100"}`}
          style={{
            backgroundImage: `url(${splashBg})`,
            backgroundColor: "#fff",
          }}
        >
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#3a2e5c]/60 backdrop-blur-sm"
            />
          )}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-5xl"
            >
              <img
                src={logoRectangle}
                alt="METADIA Logo"
                className="w-full h-auto drop-shadow-lg"
              />
            </motion.div>
          )}
          <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-64 md:w-96">
            {!isLoaded ? (
              <Progress value={splashProgress} tone="mint" />
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="shadow-xl shadow-purple-500/20 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Button size="lg" block tone="purple" onClick={handleStart}>
                    MULAI
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      )}
      <div className={`min-h-screen flex flex-col relative ${!bgUrl ? "bg-background" : ""}`}>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <AnimatePresence>
            {bgUrl && (
              <motion.div
                key={bgUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgUrl})` }}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="max-w-5xl mx-auto w-full px-6 pt-6 relative z-10">
          <Navbar
            brand={
              <Link to="/student" className="hover:opacity-80 transition-opacity flex items-center">
                <img src={logoRectangle} alt="METADIA" className="h-12 w-auto object-contain" />
              </Link>
            }
            links={[
              {
                label: "Dashboard",
                href: "/student/dashboard",
                active:
                  location.pathname === "/student" ||
                  location.pathname.startsWith("/student/dashboard"),
              },
              {
                label: "Topik Belajar",
                href: "/student/topics",
                active: location.pathname.startsWith("/student/topics"),
              },
            ]}
            actions={
              <div className="flex items-center gap-2">
                <Button
                  variant="quiet"
                  tone="idle"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Bunyikan Musik" : "Matikan Musik"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Confirm
                  title="Keluar dari Aplikasi?"
                  body="Apakah kamu yakin ingin keluar dari akunmu?"
                  confirmLabel="Keluar"
                  cancelLabel="Tetap Belajar"
                  onConfirm={() => {
                    clearAuth();
                    navigate("/");
                  }}
                >
                  <Button variant="quiet" tone="warn">
                    Keluar
                  </Button>
                </Confirm>
              </div>
            }
          />
        </div>
        <main className="p-6 max-w-5xl mx-auto w-full flex-1 relative z-10">
          <Outlet />
        </main>
      </div>
      <TipPopup />
    </>
  );
}

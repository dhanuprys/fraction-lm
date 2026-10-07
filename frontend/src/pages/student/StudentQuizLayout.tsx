import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/pouf/Button";
import { Navbar } from "@/components/pouf/navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { Confirm } from "@/components/pouf/controls";
import { useSoundStore } from "@/store/useSoundStore";
import { Volume2, VolumeX } from "lucide-react";
import exerciseBg from "@/assets/images/bg/exercise.png";
import logoRectangle from "@/assets/images/bg/logo-rectangle.png";
import { TipPopup } from "@/components/ui/TipPopup";

export default function StudentQuizLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isMuted = useSoundStore((s) => s.isMuted);
  const toggleMute = useSoundStore((s) => s.toggleMute);

  return (
    <>
      <div className={`min-h-screen flex flex-col relative`}>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <AnimatePresence>
            <motion.div
              key={exerciseBg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${exerciseBg})` }}
            />
          </AnimatePresence>
        </div>
        <div className="max-w-7xl mx-auto w-full px-6 pt-6 relative z-10">
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
                {user?.isAdmin && (
                  <div className="hidden sm:inline-flex">
                    <Button variant="quiet" tone="info" onClick={() => navigate("/admin")}>
                      Admin Panel
                    </Button>
                  </div>
                )}
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
        <main className="p-6 max-w-7xl mx-auto w-full flex-1 relative z-10">
          <Outlet />
        </main>
      </div>
      <TipPopup />
    </>
  );
}

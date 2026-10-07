import { useEffect } from "react";
import { useSoundStore } from "./store/useSoundStore";
import type { SFXName } from "./config/sound.config";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentLayout from "./pages/student/StudentLayout";
import TopicsList from "./pages/student/TopicsList";
import TopicDetail from "./pages/student/TopicDetail";
import SubTopicDetail from "./pages/student/SubTopicDetail";
import MaterialView from "./pages/student/MaterialView";
import ExerciseView from "./pages/student/ExerciseView";
import StudentQuizLayout from "./pages/student/StudentQuizLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTopics from "./pages/admin/AdminTopics";
import AdminSubTopics from "./pages/admin/AdminSubTopics";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMonitor from "./pages/admin/AdminMonitor";
import { AdminChatLogs } from "./pages/admin/AdminChatLogs";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminBackup from "./pages/admin/AdminBackup";
import { useAuthStore } from "./store/useAuthStore";
import Dashboard from "./pages/student/Dashboard";
import { LandingBlock } from "./components/pouf/blocks/landing";
import { Toaster } from "./components/pouf/toaster";

// Optional: A simple protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  useEffect(() => {
    // Initialize the sound store (preloads all SFX into an audio pool)
    useSoundStore.getState().init();

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const soundTrigger = target.closest<HTMLElement>("[data-clicksound]");

      if (soundTrigger) {
        // The attribute value maps directly to an SFX key (defaults to CLICK)
        const sfxName = (soundTrigger.dataset.clicksound?.toUpperCase() || "CLICK") as SFXName;
        useSoundStore.getState().playSFX(sfxName);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingBlock />} />
          <Route path="/login" element={<Login />} />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="topics" element={<TopicsList />} />
            <Route path="topics/:topicSlug" element={<TopicDetail />} />
            <Route path="topics/:topicSlug/:subTopicSlug" element={<SubTopicDetail />} />
            <Route path="topics/:topicSlug/:subTopicSlug/:materialId" element={<MaterialView />} />
          </Route>

          {/* Student Quiz Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentQuizLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="topics/:topicSlug/:subTopicSlug/:materialId/exercise"
              element={<ExerciseView />}
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="topics" element={<AdminTopics />} />
            <Route path="subtopics" element={<AdminSubTopics />} />
            <Route path="materials" element={<AdminMaterials />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="monitor" element={<AdminMonitor />} />
            <Route path="chat-logs" element={<AdminChatLogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="backup" element={<AdminBackup />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <div className="pouf-toasts">
        <Toaster />
      </div>
    </>
  );
}

export default App;

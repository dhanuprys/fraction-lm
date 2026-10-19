import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { LoginBlock, type LoginValues } from "@/components/pouf/blocks/login";
import { api } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import { type User } from "@/types/api";
import loginBg from "@/assets/images/bg/login.webp";

export default function Login() {
  const navigate = useNavigate();
  useDocumentTitle("Login");
  const setAuth = useAuthStore((state) => state.setAuth);

  // Prevent browser auto-translate on login page to avoid DOM corruption
  useEffect(() => {
    let meta = document.querySelector('meta[name="google"][content="notranslate"]');
    let created = false;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "google");
      meta.setAttribute("content", "notranslate");
      document.head.appendChild(meta);
      created = true;
    }
    return () => {
      if (created && meta && meta.parentNode) {
        meta.parentNode.removeChild(meta);
      }
    };
  }, []);

  const handleLogin = async (values: LoginValues) => {
    // Sanitize credentials: normalize unicode, strip zero-width/non-breaking spaces, trim username
    const cleanUsername = values.username
      .normalize("NFKC")
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
      .trim();
    const cleanPassword = values.password.replace(/[\u200B-\u200D\uFEFF]/g, "");

    const payload: LoginValues = {
      username: cleanUsername,
      password: cleanPassword,
    };

    // Call the backend authentication endpoint
    const data = await api.post<{ token: string; user: User }>("/auth/login", payload);

    if (data.data) {
      // Save token and user info to Zustand store
      setAuth(data.data.token, data.data.user);

      // Redirect based on user role
      if (data.data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed notranslate"
      translate="no"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <LoginBlock onLogin={handleLogin} />
    </div>
  );
}

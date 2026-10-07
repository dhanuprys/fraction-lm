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

  const handleLogin = async (values: LoginValues) => {
    // Call the backend authentication endpoint
    const data = await api.post<{ token: string; user: User }>("/auth/login", values);

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
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <LoginBlock onLogin={handleLogin} />
    </div>
  );
}

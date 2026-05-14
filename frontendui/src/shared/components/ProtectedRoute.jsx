import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute({ children, fallback = null }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : fallback;
}

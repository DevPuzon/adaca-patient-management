import { getToken } from "@/lib/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return getToken() !== null;
};

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}

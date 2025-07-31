import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import ComingSoon from "@/components/ui/ComingSoon";
import PatientRoutes from "./PatientRoutes";

const AuthenticatedRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route element={<AuthenticatedLayout />}>
      <Route path="/dashboard" element={<ComingSoon feature="Dashboard" />} />
      {PatientRoutes}
      <Route
        path="/appointments"
        element={<ComingSoon feature="Appointments" />}
      />
      <Route path="/reports" element={<ComingSoon feature="Reports" />} />
      <Route path="/settings" element={<ComingSoon feature="Settings" />} />
    </Route>
  </Route>
);

export default AuthenticatedRoutes;

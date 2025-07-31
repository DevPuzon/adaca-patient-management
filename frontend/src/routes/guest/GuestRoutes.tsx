import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Route } from "react-router-dom";

const GuestRoutes = (
  <Route>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Route>
);

export default GuestRoutes;

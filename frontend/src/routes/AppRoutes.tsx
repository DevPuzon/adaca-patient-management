import { BrowserRouter as Router, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./authenticated/AuthenticatedRoutes";
import GuestRoutes from "./guest/GuestRoutes";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>{GuestRoutes}</Routes>
      <Routes>{AuthenticatedRoutes}</Routes>
    </Router>
  );
}

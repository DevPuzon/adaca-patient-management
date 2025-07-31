import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUser,
  FaFileMedical,
  FaCog,
  FaHome,
} from "react-icons/fa";

const navItems = [
  { label: "Dashboard", icon: <FaHome />, to: "/dashboard" },
  { label: "Patients", icon: <FaUser />, to: "/patients" },
  { label: "Appointments", icon: <FaCalendarAlt />, to: "/appointments" },
  { label: "Reports", icon: <FaFileMedical />, to: "/reports" },
  { label: "Settings", icon: <FaCog />, to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white shadow-md fixed top-0 left-0">
      <div className="p-6 text-2xl font-bold tracking-wide border-b border-slate-700">
        PatientPortal
      </div>
      <nav className="p-4 space-y-2 text-sm">
        {navItems.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition-colors ${
                isActive ? "bg-slate-700" : "hover:bg-slate-700 text-slate-300"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

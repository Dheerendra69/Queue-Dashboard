import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login");
  }

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "hover:bg-slate-200 text-slate-700"
     }`;

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}

      <aside className="w-64 bg-white shadow-md p-5">

        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Queue Manager
        </h1>

        <nav className="space-y-3">

          <NavLink
            to="/dashboard"
            className={navClass}
          >
            <FaChartBar />

            Dashboard
          </NavLink>

          <NavLink
            to="/queues"
            className={navClass}
          >
            <FaClipboardList />

            Queues
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 transition"
          >
            <FaSignOutAlt />

            Logout
          </button>

        </nav>
      </aside>

      {/* Main */}

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-slate-200 text-slate-700"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-white
          shadow-md
          p-5
          z-50
          transform
          transition-transform
          duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Queue Manager</h1>

          <button className="md:hidden" onClick={closeSidebar}>
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="space-y-3">
          <NavLink to="/dashboard" className={navClass} onClick={closeSidebar}>
            <FaChartBar />
            Dashboard
          </NavLink>

          <NavLink to="/queues" className={navClass} onClick={closeSidebar}>
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

      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-white shadow px-4 py-3 flex items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars size={22} />
          </button>

          <h2 className="ml-4 text-lg font-semibold">Queue Manager</h2>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

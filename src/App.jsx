import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Queues from "./pages/Queues";
import QueueDetails from "./pages/QueueDetails";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./layouts/DashboardLayout";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/queues" element={<Queues />} />

        <Route path="/queues/:id" element={<QueueDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
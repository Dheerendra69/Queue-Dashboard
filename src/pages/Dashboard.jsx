import { useEffect, useState } from "react";

import AnalyticsCards from "../components/dashboard/AnalyticsCards";
import QueueChart from "../components/dashboard/QueueChart";
import Loader from "../components/common/Loader";

import {
  getDashboardStats,
  getQueueTrends,
} from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    try {
      const [statsData, trendData] = await Promise.all([
        getDashboardStats(),
        getQueueTrends(),
      ]);

      setStats(statsData);
      setTrends(trendData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <AnalyticsCards stats={stats} />

      <QueueChart data={trends} />
    </div>
  );
}
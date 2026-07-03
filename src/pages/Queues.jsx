import { useEffect, useState } from "react";

import QueueCard from "../components/queue/QueueCard";
import QueueForm from "../components/queue/QueueForm";
import Loader from "../components/common/Loader";

import {
  createQueue,
  getQueues,
} from "../services/queueService";

export default function Queues() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadQueues() {
    try {
      const data = await getQueues();

      setQueues(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQueues();
  }, []);

  async function handleCreate(data) {
    try {
      await createQueue(data);

      loadQueues();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Queues
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <QueueForm
          onSubmit={handleCreate}
        />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {queues.map((queue) => (
          <QueueCard
            key={queue._id}
            queue={queue}
          />
        ))}
      </div>

    </div>
  );
}
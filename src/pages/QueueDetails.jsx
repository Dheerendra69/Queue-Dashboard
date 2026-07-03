import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import TokenCard from "../components/queue/TokenCard";
import TokenForm from "../components/queue/TokenForm";

import {
  getTokens,
  addToken,
  moveTokenUp,
  moveTokenDown,
 serveToken,
  cancelToken,
} from "../services/tokenService";

export default function QueueDetails() {
  const { id } = useParams();

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTokens() {
    try {
      const data = await getTokens(id);

      setTokens(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTokens();
  }, [id]);

  async function handleAdd(data) {
    await addToken(id, data);

    loadTokens();
  }

  async function handleMoveUp(token) {
    await moveTokenUp(token._id);

    loadTokens();
  }

  async function handleMoveDown(token) {
    await moveTokenDown(token._id);

    loadTokens();
  }

  async function handleServe(token) {
    await serveToken(token._id);

    loadTokens();
  }

  async function handleCancel(token) {
    await cancelToken(token._id);

    loadTokens();
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Queue
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <TokenForm
          onSubmit={handleAdd}
        />
      </div>

      <div className="space-y-4">

        {tokens.map((token) => (
          <TokenCard
            key={token._id}
            token={token}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onServe={handleServe}
            onCancel={handleCancel}
          />
        ))}

      </div>

    </div>
  );
}
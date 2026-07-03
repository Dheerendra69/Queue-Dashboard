import { Link } from "react-router-dom";
import { FaUsers, FaArrowRight } from "react-icons/fa";

export default function QueueCard({ queue }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">
            {queue.name}
          </h2>

          <p className="text-gray-500 mt-2 flex items-center gap-2">
            <FaUsers />
            {queue.waitingCount ?? 0} Waiting
          </p>

        </div>

        <Link
          to={`/queues/${queue._id}`}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          <FaArrowRight />
        </Link>

      </div>

    </div>
  );
}
import {
  FaArrowUp,
  FaArrowDown,
  FaTimes,
  FaPlay,
} from "react-icons/fa";

import Button from "../common/Button";

export default function TokenCard({
  token,
  onMoveUp,
  onMoveDown,
  onServe,
  onCancel,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-5">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-lg font-bold">
            Token #{token.tokenNumber}
          </h3>

          <p className="text-gray-600">
            {token.customerName}
          </p>

          <span className="text-sm text-blue-600 capitalize">
            {token.status}
          </span>

        </div>

        <div className="flex gap-2">

          <Button
            variant="secondary"
            onClick={() => onMoveUp(token)}
          >
            <FaArrowUp />
          </Button>

          <Button
            variant="secondary"
            onClick={() => onMoveDown(token)}
          >
            <FaArrowDown />
          </Button>

          <Button
            variant="primary"
            onClick={() => onServe(token)}
          >
            <FaPlay />
          </Button>

          <Button
            variant="danger"
            onClick={() => onCancel(token)}
          >
            <FaTimes />
          </Button>

        </div>

      </div>

    </div>
  );
}
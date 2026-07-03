import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-7xl font-bold text-blue-600">
        404
      </h1>

      <p className="mt-4 text-xl">
        Page Not Found
      </p>

      <Link
        to="/dashboard"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}
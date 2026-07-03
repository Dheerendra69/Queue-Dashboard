import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-4">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">
            Queue Management System
          </h2>
        </div>

        <div className="flex items-center gap-3">

          <div className="text-right">

            <p className="font-medium">
              {user?.email}
            </p>

            <p className="text-sm text-slate-500">
              Queue Manager
            </p>

          </div>

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>

        </div>

      </div>

    </header>
  );
}
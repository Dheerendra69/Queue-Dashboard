import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = (data) => {
    const response = loginUser(data);

    response.then((data) => {
      console.log("data: ", data);
      login({
        token: data.token,
        user: {
          email: data.user.email,
          role: "manager",
        },
      });
      navigate("/dashboard");
    });

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Queue Manager
        </h1>

        <div className="mb-4">
          <label>Email</label>

          <input
            {...register("email")}
            type="email"
            className="w-full mt-2 border rounded-lg px-4 py-2"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-6">
          <label>Password</label>

          <input
            {...register("password")}
            type="password"
            className="w-full mt-2 border rounded-lg px-4 py-2"
            placeholder="Enter password"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3">
          Login
        </button>
      </form>
    </div>
  );
}

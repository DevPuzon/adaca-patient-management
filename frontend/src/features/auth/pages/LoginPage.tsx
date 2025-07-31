import { LOGIN_MUTATION } from "@/graphql/mutations/auth/loginMutation";
import { useGraphqlMutation } from "@/lib/hooks/useGraphqlMutation";
import { cookie } from "@/lib/utils/cookie";
import { setUser } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { execute, loading } = useGraphqlMutation({
    mutation: LOGIN_MUTATION,
    onSuccess: (data) => {
      const { token, user } = data?.login || {};

      if (token && user) {
        cookie.set("token", token, 7);
        dispatch(setUser(user));
        navigate("/patients");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    await execute({
      variables: { input: { email, password } },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

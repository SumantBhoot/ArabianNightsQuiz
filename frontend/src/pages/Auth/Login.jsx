import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll.jsx";

export default function Login() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(location.state?.username || "");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [regSuccess, setRegSuccess] = useState(!!location.state?.registered);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    try {
      await login({ username: name, password });
      navigate("/");
    } catch (e) {
      setFormError(e.message || "Login failed");
      setTimeout(() => setFormError(null), 5000);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // Clear location state and auto-dismiss success message
  useEffect(() => {
    if (regSuccess) {
      // Replace history entry to drop state
      navigate("/login", { replace: true });
      const t = setTimeout(() => setRegSuccess(false), 6000);
      return () => clearTimeout(t);
    }
  }, [regSuccess, navigate]);

  if (isAuthenticated) return null;

  return (
    <Scroll>
      <div className="text-xl">
        {regSuccess && (
          <div className="mb-4 text-green-600 text-base bg-green-50 border border-green-300 rounded px-3 py-2 w-full max-w-sm">
            Registration successful. Please log in.
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
          <input
            className="border rounded px-2"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            name="password"
            className="border rounded px-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="self-stretch px-4 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="self-end cursor-pointer"
              disabled={loading}
            >
              Register
            </button>
            <button
              type="submit"
              className="self-end cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {(error || formError) && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {formError || error}
            </div>
          )}
        </form>
      </div>
    </Scroll>
  );
}

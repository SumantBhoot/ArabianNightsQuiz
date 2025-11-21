import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Scroll from "./Scroll.jsx";

export default function Register() {
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    try {
      await register({ username: name, password });
      // Navigate to login page with success state
      navigate("/login", { state: { registered: true, username: name } });
    } catch (e) {
      setFormError(e.message || "Registration failed");
      setTimeout(() => setFormError(null), 5000);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <Scroll>
      <div className="text-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
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
          <input
            name="confirmPassword"
            className="border rounded px-2"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="self-stretch px-4 flex justify-between">
            <button
              type="submit"
              className="self-end cursor-pointer"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              className="self-end cursor-pointer"
              disabled={loading}
              onClick={() => navigate("/login")}
            >
              Login
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form style={styles.form} onSubmit={onSubmit}>
      <h2>Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" style={styles.button}>
        Login
      </button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 400,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 8,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  input: {
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#0077cc",
    color: "white",
    cursor: "pointer",
    marginTop: 5,
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

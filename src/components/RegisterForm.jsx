import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.phone, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form style={styles.form} onSubmit={onSubmit}>
      <h2>Register</h2>
      {error && <div style={styles.error}>{error}</div>}
      <input
        style={styles.input}
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
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
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
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

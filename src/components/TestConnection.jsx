import React from "react";
import api from "../api";

export default function TestConnection() {
  const testApi = async () => {
    try {
      const res = await api.get("/auth/profile"); // Protected route
      console.log("✅ API Test Success:", res.data);
      alert("✅ API connected! User: " + res.data.name);
    } catch (err) {
      console.error("❌ API Test Failed:", err);
      alert("❌ API connection failed:\n" + (err.message || "Unknown error"));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Test API Connection</h3>
      <button onClick={testApi} style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        Ping API
      </button>
    </div>
  );
}

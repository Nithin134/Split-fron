import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomExpenses, setRoomExpenses] = useState({});
  const location = useLocation();

  const fetchDashboardData = async () => {
    try {
      const statsRes = await api.get("/expenses/dashboard/stats");
      setStats(statsRes.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  const fetchRoomsAndExpenses = async () => {
    try {
      const roomRes = await api.get("/rooms/mine");
      setRooms(roomRes.data);

      const allExpenses = {};
      for (const room of roomRes.data) {
        const expRes = await api.get(`/expenses/${room._id}`);
        allExpenses[room._id] = expRes.data;
      }
      setRoomExpenses(allExpenses);
    } catch (err) {
      console.error("Failed to fetch rooms or expenses", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchRoomsAndExpenses();
  }, [location.pathname]);

  useEffect(() => {
    const handleFocus = () => {
      fetchDashboardData();
      fetchRoomsAndExpenses();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {/* STATISTICS */}
      <div style={styles.dashboardGrid}>
        <div style={styles.dashboardCard}>
          <h3>Rooms Created</h3>
          <p>{stats.numberRoomsCreated || 0}</p>
        </div>
        <div style={styles.dashboardCard}>
          <h3>Active Rooms</h3>
          <p>{stats.numberRoomsActive || 0}</p>
        </div>
        <div style={styles.dashboardCard}>
          <h3>Participants</h3>
          <p>{stats.numberParticipants || 0}</p>
        </div>
        <div style={styles.dashboardCard}>
          <h3>Expenses Recorded</h3>
          <p>{stats.numberExpenses || 0}</p>
        </div>
      </div>

      {/* ROOM + EXPENSE LIST */}
      <h2 style={{ marginTop: 40 }}>Your Rooms and Expenses</h2>
      {rooms.map((room) => (
        <div key={room._id} style={styles.roomSection}>
          <h3>
            {room.name} <Link to={`/rooms/${room._id}`} style={styles.roomLink}>[Go to Room]</Link>
          </h3>
          <ul>
            {(roomExpenses[room._id] || []).map((exp) => (
              <li key={exp._id}>
                ₹{exp.amount} - {exp.description} ({exp.category}) by {exp.paidBy?.name || "Unknown"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: 20,
    marginTop: 20,
  },
  dashboardCard: {
    backgroundColor: "#0077cc",
    color: "white",
    borderRadius: 8,
    padding: 20,
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  roomSection: {
    backgroundColor: "#f0f4f8",
    padding: 20,
    borderRadius: 6,
    marginBottom: 20,
  },
  roomLink: {
    fontSize: "0.9rem",
    marginLeft: 10,
    color: "#0077cc",
    textDecoration: "none",
  },
};

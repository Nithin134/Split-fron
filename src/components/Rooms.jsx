import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ParticipantsList from "./ParticipantsList";
import ExpenseForm from "./ExpenseForm";
import AddParticipants from "./AddParticipants";
import api from "../api"; // ✅ Correct source of api

export default function Rooms() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const fetchParticipants = async () => {
    try {
      const res = await api.get(`/rooms/${roomId}/participants`);
      setParticipants(res.data);
    } catch (err) {
      console.error("Failed to fetch participants:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await api.get(`/expenses/${roomId}`);
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  const fetchSettlements = async () => {
    try {
      const res = await api.get(`/expenses/${roomId}/settlements`);
      setSettlements(res.data);
    } catch (err) {
      console.error("Failed to fetch settlements:", err);
    }
  };

  console.log("Current roomId:", roomId);


  const addExpense = async (expense) => {
    try {
      const res = await api.post(`/expenses/${roomId}`, expense);
      setExpenses((prev) => [...prev, res.data]);
      fetchSettlements();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await api.delete(`/expenses/${roomId}/${expenseId}`);
      setExpenses(expenses.filter(e => e._id !== expenseId));
      fetchSettlements();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const removeParticipant = async (participantId) => {
    try {
      await api.delete(`/rooms/${roomId}/participants/${participantId}`);
      fetchParticipants();
    } catch (err) {
      console.error("Error removing participant:", err);
    }
  };

  const deleteRoom = async () => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${roomId}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  useEffect(() => {
 if (!roomId || roomId.length !== 24) {
    console.error("Invalid roomId:", roomId);
    return;   }
    fetchParticipants();
    fetchExpenses();
    fetchSettlements();
  }, [roomId]);

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Room Expense Dashboard</h1>
        <div style={styles.actionButtons}>
          <button onClick={deleteRoom} style={styles.deleteRoomBtn}>Delete Room</button>
          <Link to="/rooms/create" style={styles.createRoomBtn}>+ Create New Room</Link>
        </div>
      </div>

      <section style={styles.card}>
        <h2>Participants in This Room</h2>
        <p>You can manage participants from here.</p>
        <AddParticipants onParticipantsAdded={fetchParticipants} />
        <h3>Current Participants:</h3>
        <ul>
          {participants.map((p) => (
            <li key={p.user._id}>
              {p.user.name} ({p.user.email || p.user.phone})
              <button onClick={() => removeParticipant(p.user._id)} style={styles.deleteBtn}>Remove</button>
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.card}>
        <h2>Add Expense</h2>
        <ExpenseForm participants={participants} onAddExpense={addExpense} />
      </section>

      <section style={styles.card}>
        <h2>Expense List</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Paid By</th>
              <th style={styles.th}>Split Between</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, i) => (
              <tr key={i}>
                <td style={styles.td}>{e.description}</td>
                <td style={styles.td}>{e.category}</td>
                <td style={styles.td}>₹{e.amount}</td>
                <td style={styles.td}>{e.paidBy.name}</td>
                <td style={styles.td}>{e.participants.map(p => p.name).join(", ")}</td>
                <td style={styles.td}>
                  <button onClick={() => deleteExpense(e._id)} style={styles.deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={styles.card}>
        <h2>Owed Settlements</h2>
        {settlements.length === 0 ? (
          <p>All settled up!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>From</th>
                <th style={styles.th}>To</th>
                <th style={styles.th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((s, i) => (
                <tr key={i}>
                  <td style={styles.td}>{s.from}</td>
                  <td style={styles.td}>{s.to}</td>
                  <td style={styles.td}>₹{s.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    color: "#004080",
  },
  actionButtons: {
    display: "flex",
    gap: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  th: {
    backgroundColor: "#f0f0f0",
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 12px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
    wordWrap: "break-word",
  },
  deleteBtn: {
    marginLeft: 10,
    backgroundColor: "#ff4d4d",
    border: "none",
    color: "white",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
  },
  createRoomBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 14px",
    borderRadius: 4,
    textDecoration: "none",
    fontWeight: "bold",
  },
  deleteRoomBtn: {
    backgroundColor: "#cc0000",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: 4,
    cursor: "pointer",
  },
};

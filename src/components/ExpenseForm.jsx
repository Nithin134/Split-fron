import React, { useState } from "react";

export default function ExpenseForm({ participants, onAddExpense }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [paidBy, setPaidBy] = useState(""); //  Paid by participant ID

  const toggleParticipant = (id) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const submitExpense = () => {
    if (!description || !amount || selectedParticipants.length === 0 || !paidBy) {
      alert("Please fill all fields and select participants and who paid");
      return;
    }

    const share = (Number(amount) / selectedParticipants.length).toFixed(2);

    onAddExpense({
      description,
      category,
      amount: Number(amount),
      paidBy,
      participants: selectedParticipants,
      share, 
    });

 
    setDescription("");
    setCategory("Food");
    setAmount("");
    setSelectedParticipants([]);
    setPaidBy("");
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <div>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginRight: 10 }}>
          <option>Food</option>
          <option>Wi-Fi</option>
          <option>Rent</option>
          <option>Electricity</option>
          <option>Other</option>
        </select>
        <input
          placeholder="Amount"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/*   Dropdown(Paid By) */}
      <div style={{ marginTop: 10 }}>
        <strong>Paid By: </strong>
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option value="">-- Select One --</option>
          {participants.map((p) => (
            <option key={p.user._id} value={p.user._id}>
              {p.user.name}
            </option>
          ))}
        </select>
      </div>

      {/*  Participant Checkboxes */}
      <div style={{ marginTop: 10 }}>
        <strong>Select Participants:</strong>
        {participants.map((p) => (
          <label key={p.user._id} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={selectedParticipants.includes(p.user._id)}
              onChange={() => toggleParticipant(p.user._id)}
            />
            {p.user.name}
          </label>
        ))}
      </div>

      <button onClick={submitExpense} style={{ marginTop: 10 }}>
        Add Expense
      </button>
    </div>
  );
}

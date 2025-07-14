import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; 

export default function AddParticipants({ onParticipantsAdded }) {
  const { roomId } = useParams();
  const [emailsOrPhones, setEmailsOrPhones] = useState("");
  const [message, setMessage] = useState("");

  const addParticipants = async () => {
    try {
      const inputArray = emailsOrPhones.split(",").map((item) => item.trim());
      await api.post(`/rooms/${roomId}/participants`, {
        participants: inputArray,
      });
      setMessage("Participants added!");
      setEmailsOrPhones("");

   
      onParticipantsAdded();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add participants.");
    }
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>Add Participants</h3>
      <p>Enter comma-separated emails or phone numbers:</p>
      <textarea
        rows="2"
        style={{ width: "100%" }}
        value={emailsOrPhones}
        onChange={(e) => setEmailsOrPhones(e.target.value)}
      />
      <button onClick={addParticipants} style={{ marginTop: 10 }}>
        Add
      </button>
      <p>{message}</p>
    </div>
  );
}

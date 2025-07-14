import React, { useState } from "react";
import api from "../api"; 
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const res = await api.post("/rooms", { name: roomName });
      setMessage("Room created successfully!");
      navigate(`/rooms/${res.data._id}`);
    } catch (err) {
      setMessage("Failed to create room");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create New Room</h1>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={createRoom} style={{ padding: 10 }}>
        Create
      </button>
      <p>{message}</p>
    </div>
  );
}

import React from "react";
import { useAuth } from "./AuthProvider";

export default function Profile() {
  const { user } = useAuth();
  return user ? (
    <div style={{ padding: 20 }}>
      <h1>Your Profile</h1>
      <p><strong>Name: </strong>{user.name}</p>
      <p><strong>Email: </strong>{user.email}</p>
      {user.phone && <p><strong>Phone: </strong>{user.phone}</p>}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

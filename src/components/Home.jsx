import React from "react";

export default function Home() {
  return (
    <div style={styles.homeContainer}>
      <h1>Welcome to Room Expense Splitter</h1>
      <p style={{ maxWidth: 800, margin: "auto", lineHeight: 1.6 }}>
        This website helps you track and split your expenses easily with roommates or trip participants. Create rooms,
        add participants by email or phone, add expenses like rent, bills, and food, and keep everyone notified automatically.
        Our system handles all the calculations and notifies everyone via email or text, making shared expenses hassle-free.
      </p>
      <h2>Services</h2>
      <ul>
        <li>Create and manage rooms</li>
        <li>Add participants via email or phone</li>
        <li>Track expenses in rupees (₹)</li>
        <li>Automatic notifications on spending</li>
        <li>Dashboard with room stats and participants</li>
        <li>Manage trips and share expenses</li>
      </ul>
      <h2>How to Use</h2>
      <p>
        Register or login, create a room, add your roommates or fellow travelers, start adding expenses, and view your dashboard for detailed breakdowns.
      </p>
    </div>
  );
}

const styles = {
  homeContainer: {
    maxWidth: 900,
    margin: "40px auto",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 8,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
};

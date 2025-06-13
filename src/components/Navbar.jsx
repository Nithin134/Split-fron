import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Room Expense Splitter</div>
      <div>
        <Link to="/" style={styles.navLink}>
          Home
        </Link>
        <Link to="/rooms/${roomId}" style={styles.navLink}>
          Menu
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
            <Link to="/rooms/create" style={styles.navLink}>
              Create Room
            </Link>

            <Link to="/profile" style={styles.navLink}>
              Profile
            </Link>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#004080",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLink: {
    color: "white",
    marginLeft: 15,
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutButton: {
    marginLeft: 15,
    padding: "6px 12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#cc3300",
    color: "white",
    fontWeight: "bold",
  },
};

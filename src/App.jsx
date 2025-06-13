import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TestConnection from "./components/TestConnection";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile";
import Rooms from "./components/Rooms";
import CreateRoom from "./components/CreateRoom";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <main style={{ flex: "1 1 auto", padding: 20, backgroundColor: "#f0f4f8" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/test" element={<TestConnection />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms/:roomId"
                element={
                  <ProtectedRoute>
                    <Rooms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms/create"
                element={
                  <ProtectedRoute>
                    <CreateRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

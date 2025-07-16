


import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load all pages
const Home = lazy(() => import("./components/Home"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const RegisterForm = lazy(() => import("./components/RegisterForm"));
const Profile = lazy(() => import("./components/Profile"));
const Rooms = lazy(() => import("./components/Rooms"));
const CreateRoom = lazy(() => import("./components/CreateRoom"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const TestConnection = lazy(() => import("./components/TestConnection"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <main style={{ flex: "1 1 auto", padding: 20, backgroundColor: "#f0f4f8" }}>
            <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
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
            </Suspense>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

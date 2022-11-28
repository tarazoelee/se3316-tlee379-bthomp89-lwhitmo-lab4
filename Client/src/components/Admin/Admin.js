import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { auth } from "firebase-admin";
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function Admin() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <h1>Logged in as Admin, You have SM Privlege</h1>
      <button onClick={handleLogout}>Logout {user.email}</button>
    </div>
  );
}
//use state to ensure the person trying to access his page is the admin

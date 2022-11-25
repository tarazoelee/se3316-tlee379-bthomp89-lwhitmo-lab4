import React, { useEffect, useState } from "react";
// import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { auth } from "firebase-admin";
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function VerifyEmail() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function sendEmail() {
    sendEmailVerification(auth.currentUser);
  }

  async function handleLogout() {
    try {
      setError("");
      await logout();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    if (user != null) {
      if (user.emailVerified === false) {
        history("/verifyemail");
        //history("/userdash");
      } else {
        history("/userdash");
      }
    }
  }, [user]);

  return (
    <div>
      <h1>PLEASE VERIFY YOUR ACCOUNT {auth.currentUser.email}</h1>
      <button onClick={sendEmail}>SEND VERIFICATION EMAIL</button>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

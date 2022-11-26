import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
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
    alert("Verification Email Sent");
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
    <div className="logincard-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">
            Verify Your Email {auth.currentUser.email}
          </h2>
          <Button
            className="w-100 bg-secondary border-0 mt-3"
            onClick={sendEmail}
          >
            Send Verification Email
          </Button>
          <Button
            className="w-100 bg-secondary border-0 mt-3"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

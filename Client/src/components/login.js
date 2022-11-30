import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { GoogleButton } from "react-google-button";
import { useAuth } from "../contexts/AuthContext";
import { json, Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";

import "./login.css";
//import { signInWithGoogle } from "../firebase";

export default function Login() {
  const auth = getAuth();
  const user = auth.currentUser;
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleSignIn, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let admin;
  const history = useNavigate();
  
  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  //This block of code handles routing based on the user stored
  useEffect(() => {
    if (currentUser != null) {
      var userID = currentUser.uid;
      checkAdmin(userID).then(()=>{
        console.log("Need "+admin)
        if (admin === true) {
          history("/admin");
        } else if (user.emailVerified === false) {
          history("/verifyemail");
          //history("/userdash");
        } else {
          history("/userdash");
        }
      }).catch("error")
    } else {
      history("/");
    }
  }, [currentUser]);

  async function checkAdmin(userID) {
    await fetch(`api/users/isadmin/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          console.log(Boolean(data))
          admin = data
          setLoading(true)
        });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      if (
        err.message ===
        "Firebase: The user account has been disabled by an administrator. (auth/user-disabled)."
      ) {
        setError("Your account has been disabled. Contact administrator");
      } else {
        setError("Failed to login to account");
      }
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="logincontent-container">
        <h1>Music Player</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="logincard-container">
        <Card className="login-card">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 bg-secondary border-0 mt-3"
                type="submit"
              >
                Login
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="w-100 text-center mt-3">
              <Link to="/opendash">Continue without an account</Link>
            </div>
            <div className="w-100 text-center mt-2 text-gray">
              Need an account? <Link to="/signup">Signup</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="googlebutton"></div>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { auth } from "firebase-admin";
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function Admin() {
  return (
    <div>
      <h1>ADMIN</h1>
    </div>
  );
}
//use state to ensure the person trying to access his page is the admin

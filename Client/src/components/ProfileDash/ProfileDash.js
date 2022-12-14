import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import './ProfileDash.css'

export default function ProfileDash() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div className="profiledash-card">
          {error && <Alert variant="danger">{error}</Alert>} {currentUser.email}
          <Link to="/update-profile" className="update-btn">
            Update Profile
          </Link>
          <div>
            <Button variant="link" onClick={handleLogout} className='text-decoration-none text-secondary'>
              Log Out
            </Button>
         </div>
      </div>
  )
}
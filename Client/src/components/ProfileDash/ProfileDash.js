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
      history("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div className="profiledash-card">
          {error && <Alert variant="danger">{error}</Alert>} {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary mt-2 bg-secondary border-0 fs-6">
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
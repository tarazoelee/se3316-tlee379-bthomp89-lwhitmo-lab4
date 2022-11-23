import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

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
    <div>
      <Card className="w-75">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>} {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-60 mt-2 bg-secondary border-0 fs-6">
            Update Profile
          </Link>
          <div className=" text-center">
            <Button variant="link" onClick={handleLogout} className='text-decoration-none text-secondary'>
              Log Out
            </Button>
         </div>
        </Card.Body>
      </Card>
      </div>
  )
}
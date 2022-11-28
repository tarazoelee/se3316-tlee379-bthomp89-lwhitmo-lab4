import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./OpenDashboard/Dashboard";
import Login from "./login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import UserDash from "./UserDash/UserDash";
import Playlist from "./Playlist/Playlist";
import VerifyEmail from "./VerifyEmail/VerifyEmail";
import UnAuthPlaylist from "./UnAuthPlaylist/UnAuthPlaylistVie";


function App() {
  return (
    <div
      //className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", minWidth: "100vh" }}
    >
      <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login></Login>} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/opendash" element={<Dashboard></Dashboard>} />
              <Route path="/userdash" element={<UserDash/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/playlist/:id" element={<Playlist></Playlist>}/>
              <Route path="/verifyemail" element={<VerifyEmail />} />
              <Route path="/playlistview/:id" element={<UnAuthPlaylist></UnAuthPlaylist>}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;

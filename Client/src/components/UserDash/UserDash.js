import React, { useEffect, useRef, useState } from "react";
import "./UserDash.css";
import SearchTracks from "../SearchTracks/SearchTracks";
import PlaylistList from "../PlaylistList/PlaylistList";
import ProfileDash from "../ProfileDash/ProfileDash";
import PublicPlaylist from "../PublicPlaylist/PublicPlaylist";
import { useAuth } from "../../contexts/AuthContext";
import { json, Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";

function UserDash() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { currentUser } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    if (currentUser != null) {
      if (user.emailVerified === false) {
        history("/verifyemail");
        //history("/userdash");
      } else {
        history("/userdash");
      }
    } else {
      history("/");
    }
  }, [currentUser]);

  return (
    <div className="dash-container">
      <div className="list-container">
        <PlaylistList></PlaylistList>
        <PublicPlaylist></PublicPlaylist>
      </div>
      <div className="searchtracks-container">
        <SearchTracks></SearchTracks>
      </div>
      <div>
        <ProfileDash></ProfileDash>
        <Link to="/privacy">Privacy Policy</Link>
        <p></p>
        <Link to="/aup">Acceptable Use Policy</Link>
        <p></p>
        <Link to='/DMCA'>DMCA Policy</Link>
      </div>
    </div>
  );
}

export default UserDash;

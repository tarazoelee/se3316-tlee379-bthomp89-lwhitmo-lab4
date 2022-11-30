import React from "react";
import "./UserDash.css";
import SearchTracks from "../SearchTracks/SearchTracks";
import PlaylistList from "../PlaylistList/PlaylistList";
import ProfileDash from "../ProfileDash/ProfileDash";
import PublicPlaylist from "../PublicPlaylist/PublicPlaylist";
import { Link } from "react-router-dom";

function UserDash() {
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
      </div>
    </div>
  );
}

export default UserDash;

import React from 'react'
import './PlaylistList.css'
import { Link, useNavigate } from "react-router-dom";
function PlaylistList() {

  const history = useNavigate();
  function openPlaylist(){
    history('/playlist/1') //open new page for that playlist
  }
  return (
    <div className='playlist-container'>
      <h3>Browse playlists</h3>
      <button class="btn btn-outline-light">Create New Playlist</button>
      <div className='track-container'  onClick={openPlaylist}>
            Playlist  
      </div>
      <div className='title'>Browse Playlists</div>
      <button class="btn btn-outline-light">Create Playlist</button>
    </div>
  )
}

export default PlaylistList;

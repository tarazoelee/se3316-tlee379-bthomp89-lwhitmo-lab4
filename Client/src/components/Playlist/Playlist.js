import React from 'react'
import './Playlist.css'
import SearchTracksForPlaylist from '../SearchTracksForPlaylists/SearchTracksForPlaylist';
import PlaylistInformation from '../Playlist Information/PlaylistInformation';
import { Link, useNavigate } from "react-router-dom";

//play list for logged in users
function Playlist() {
    const history = useNavigate();
    function goBack(){
        history("/userdash")
    }
  return (
    <div className='dash-container'>
        <div className='list-container'>
            <PlaylistInformation></PlaylistInformation>
        </div>
        <div className='searchtracks-cont'>
            <h2 className="mt-3">Add Songs</h2>
                <SearchTracksForPlaylist></SearchTracksForPlaylist>
            </div>
        <div className='go-back-btn'>
            <button onClick={goBack} class="btn btn-outline-light">Go Back</button>
        </div>
    </div>
  )
}

export default Playlist;

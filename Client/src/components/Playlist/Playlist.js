import React from 'react'
import './Playlist.css'
import SearchTracks from '../SearchTracks/SearchTracks';
import PlaylistInformation from '../Playlist Information/PlaylistInformation';
import { Link, useNavigate } from "react-router-dom";

function Playlist() {
    const history = useNavigate();
    function goBack(){
        history("/userdash")
    }
  return (
    <div className='dash-container'>
        <div className='searchtracks-container'>
        <h2 className="text-center mb-4">Add Songs</h2>
            <SearchTracks></SearchTracks>
        </div>
        <div className='list-container'>
            <PlaylistInformation></PlaylistInformation>
        </div>
        <div className='go-back'>
            <button onClick={goBack} class="btn btn-outline-light">Go Back</button>
        </div>
    </div>
  )
}

export default Playlist;

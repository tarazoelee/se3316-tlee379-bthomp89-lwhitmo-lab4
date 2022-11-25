import React from 'react'
import './Playlist.css'
import SearchTracks from '../SearchTracks/SearchTracks';

//page for each individual playlist
function Playlist() {
  return (
    <div className='play-container'>
        <span>
        <div className='addSongs'>
            <h1>Add Songs</h1>
        <p><SearchTracks></SearchTracks></p>
        </div>
        
        <div className='playlistInfo'>
            <h1>Playlist information!</h1>
            </div>
        </span>
    </div>
  )
}

export default Playlist;

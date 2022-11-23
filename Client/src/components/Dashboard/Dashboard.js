import React from 'react'
import './Dashboard.css'
import SearchTracks from '../SearchTracks/Tracks';
import PlaylistList from '../PlaylistList/PlaylistList';
import ProfileDash from '../ProfileDash';

function Dashboard() {
  return (
    <div className='dash-container'>
        <div className='list-container'>
            <PlaylistList></PlaylistList>
        </div>
        <div className='searchtracks-container'>
            <SearchTracks></SearchTracks>
        </div>
        <div>
        <ProfileDash></ProfileDash>
        </div>
    </div>
  )
}

export default Dashboard;

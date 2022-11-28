import React from 'react'
import './Dashboard.css'
import SearchTracks from '../SearchTracks/SearchTracks';
import PublicPlaylist from '../PublicPlaylist/PublicPlaylist';
import ProfileDash from '../ProfileDash/ProfileDash';

function Dashboard() {
  return (
    <div className='dash-container'>
        <div className='list-container'>
            <PublicPlaylist></PublicPlaylist>
        </div>
        <div className='searchtracks-container'>
            <SearchTracks></SearchTracks>
        </div>
    </div>
  )
}

export default Dashboard;

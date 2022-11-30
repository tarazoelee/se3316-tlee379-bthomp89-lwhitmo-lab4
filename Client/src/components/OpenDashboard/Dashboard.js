import React from 'react'
import './Dashboard.css'
import SearchTracks from '../SearchTracks/SearchTracks';
import PublicPlaylist from '../PublicPlaylist/PublicPlaylist';
import ProfileDash from '../ProfileDash/ProfileDash';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='dash-container'>
        <div className='list-container'>
            <PublicPlaylist></PublicPlaylist>
        </div>
        <div className='searchtracks-container'>
            <SearchTracks></SearchTracks>
        </div>
        <div className="w-100 text-center mt-2 text-gray">
            <Link to="/privacy">Privacy Policy</Link>
        </div>
    </div>
  )
}

export default Dashboard;

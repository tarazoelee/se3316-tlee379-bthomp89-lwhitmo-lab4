import React from 'react'
import './Dashboard.css'
import SearchTracks from '../SearchTracks/SearchTracks';
import OpenPublicPlaylist from '../OpenPublicPlaylist/OpenPublicPlaylist';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='dash-container'>
        <div className='list-container'>
          <OpenPublicPlaylist></OpenPublicPlaylist>
        </div>
        <div className='searchtracks-container'>
            <SearchTracks></SearchTracks>
        </div>
        <div className="w-100 text-center mt-2 text-gray">
            <Link to="/privacy">Privacy Policy</Link>
            <p></p>
            <Link to="/aup">Acceptable Use Policy</Link>
            <p></p>
            <Link to='/DMCA'>DMCA Policy</Link>
        </div>x
    </div>
  )
}

export default Dashboard;

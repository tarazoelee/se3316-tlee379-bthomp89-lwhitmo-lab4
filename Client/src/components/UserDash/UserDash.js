import React from 'react'
import './UserDash.css'
import SearchTracks from '../SearchTracks/SearchTracks';
import PlaylistList from '../PlaylistList/PlaylistList';
import ProfileDash from '../ProfileDash';

function UserDash() {
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

export default UserDash;

import React from 'react'
import './PlaylistInformation.css'
import { Link, useNavigate } from "react-router-dom";
function PlaylistInformation() {

  const history = useNavigate();
  function openPlaylist(){
    history('/playlist/1') //open new page for that playlist
  }
  return (
    <div className='playlist-container'>
      <h3 className="text-center mb-4">Information</h3>
    </div>
  )
}

export default PlaylistInformation;

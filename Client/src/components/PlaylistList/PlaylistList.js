import './PlaylistList.css'
import {React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Popup from '../Popup/popup';


function PlaylistList() {
  const [items, setItems] = useState([])
  const [DataisLoaded, setLoading]= useState(false)
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const togglePopupClose=()=>{
    setIsOpen(false);
  }
  const history = useNavigate();

  //calls fetch data once when page loaded
  useEffect(() => {
      fetchData();
  }, []);

  //Fetch all playlist data 
  function fetchData(){
      fetch("/api/playlist")
          .then((res) => res.json())
          .then((json) => {
                  setItems(json);
                  setLoading(true);
          ;
      })
  }

  //Displays 'loading...' if not loaded yet 
   if (!DataisLoaded){ 
      return <div> <h1 className='text-white fs-5'> loading.... </h1> </div> ;
   }

  function openPlaylist(passed){
    history('/playlist/'+passed) //open new page for that playlist
  }
  

  return (
    <div className='playlist-container'>
      <h3 className='title'>Browse playlists</h3>
      <div>
    <input
      type="button"
      value="Create Playlist"
      onClick={togglePopup}
    />
    {isOpen && <Popup
      content={<>
      <p></p>
      <span>Name:  <input></input></span>
      </>}
      handleClose={togglePopup}
    />}
  </div>
      <div className='playlist-container' >{
      items.map((item) => ( 
        <div key = { item.id } className='track-container' onClick={()=>openPlaylist(item.id)}>
        <p className='text-black fs-5'>Name: {item.Name}</p>
       </div>
                    ))
                    }
      </div>
  
    </div>
  )
}

export default PlaylistList;

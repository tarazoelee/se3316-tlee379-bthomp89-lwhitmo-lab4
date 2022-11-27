import './PlaylistList.css'
import {React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Popup from '../Popup/popup';
import { useAuth } from "../../contexts/AuthContext"
import { Alert } from 'react-bootstrap';


function PlaylistList() {
  const [items, setItems] = useState([])
  const [DataisLoaded, setLoading]= useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth()
  const names=[];
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
  function addPlaylist(name){
    const names=[];
    //get an array of current playlist names
    for(let i=0; i<items.length;i++){
      names.push(items[i].Name)
    }
    //if there is a playlist with that name already, do not add the playlist
    if(names.includes(name)){
      console.log("called")
      return alert("choose a new name")
    }
    console.log(name)
      fetch("/api/playlist/create",{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          "Content-length" : 3
        },
        body: JSON.stringify({"name": name, "email": currentUser.email, "user": currentUser.email.substr(0, currentUser.email.indexOf('@')) })
      })
        
  }

  function deletePlaylist(id){
    fetch('/api/playlist/deletePlaylist/'+id,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "Content-length" : 3
      }
    })
  }
//get the length of the list of songs
  function getLength (item){
    if(item===undefined){
      return 0
    }
    console.log(item.length)
      return item.length
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
      <span>Name:  <input id='playName'></input></span>
      <button onClick={()=>addPlaylist(document.getElementById('playName').value)}>Submit</button>
      </>}
      handleClose={togglePopup}
    />}
  </div>
      <div className='playlist-container' >{
      items.map((item, arrRef) => ( 
        arrRef=item.Songs,
        <div key = { item.id } className='track-container'>
        <p className='text-black fs-5'>Name: {item.Name}, Creators Name: {item.User}, {getLength(arrRef)} tracks, Time: {item.Time}</p>
        <button onClick={()=>openPlaylist(item.id)}>Open Playlist</button>
        <button onClick={()=>deletePlaylist(item.id)}>Delete Playlist</button>
       </div>
                    ))
                    }
      </div>
  
    </div>
  )
}

export default PlaylistList;

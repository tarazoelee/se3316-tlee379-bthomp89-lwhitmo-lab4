import './PlaylistList.css'
import {React, useState, useEffect, usePrevious} from 'react';
import { useNavigate } from "react-router-dom";
import Popup from '../Popup/popup';
import { useAuth } from "../../contexts/AuthContext"
import { Alert } from 'react-bootstrap';


function PlaylistList() {
  const [items, setItems] = useState([])
  const [auth, setAuth]= useState([]);
  const [DataisLoaded, setLoading]= useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth()
  const authh=[];
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  function refreshPage() {
    window.location.reload(false);
  }
  const history = useNavigate();

  //calls fetch data once when page loaded
  useEffect(() => {
      fetchData()
  }, []);
//for the number of items in the list, call to check if they are the users 
  useEffect(()=>{
    usersPlaylists()
  },[items])
  //Fetch all playlist data 
  async function fetchData(){
      await fetch("/api/playlist")
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
  
  //open the playlist
  function openPlaylist(passed){
    history('/playlist/'+passed)
  }
  //check who the owner of the playlist and add to array if they are the current users
  async function usersPlaylists(){
    const newMap=[]
    items.map((item)=>{
      if(item.UserEmail == currentUser.email){
        newMap.push(item)
      }
    })
    setAuth(newMap)
    
  }

    //HTML Sanitization
    function encodeHTML(s) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
    }

  function addPlaylist(name){
    var safe = encodeHTML(name)
    const names=[];
    //get an array of current playlist names
    for(let i=0; i<auth.length;i++){
      names.push(auth[i].Name)
    }
    //if there is a playlist with that name already, do not add the playlist
    if(names.includes(name)){
      return alert("choose a new name")
    }
      fetch("/api/playlist/create",{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          "Content-length" : 7
        },
        body: JSON.stringify({"name": safe, "email": currentUser.email, "user": currentUser.email.substr(0, currentUser.email.indexOf('@')) })
      })
      refreshPage()
  }
//delete the playlist
  function deletePlaylist(id){
    fetch('/api/playlist/deletePlaylist/'+id,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "Content-length" : 3
      }
    })
    refreshPage()
  }
//get the length of the list of songs
  function getLength (item){
    if(item===undefined){
      return 0
    }
      return item.length
  }
  return (
    <div className='your-playlist-container'>
        <h3 className='title'>My Playlists</h3>
      <div className='create-playlist-container'>
        <input
          type="button"
          value="Create Playlist"
          onClick={togglePopup}
        />
        {isOpen && <Popup
          content={<>
          <p></p>
          <input id='playName' placeholder='name your playlist'></input>
          <button onClick={()=>addPlaylist(document.getElementById('playName').value)}>Submit</button>
          </>}
          handleClose={togglePopup}
        />}
    </div>
      <div className='playlist-list-container'>{
        auth.map((item, arrRef) => ( 
        arrRef=item.Songs,
        <div key = { item.id } className='track-container'>
        <p className='playlist-title'>{item.Name}</p>
        <p className='playlist-details'>Creator: {item.User}, {getLength(arrRef)} tracks, Time: {item.Time}</p>
        <button onClick={()=>openPlaylist(item.id)}>Open playlist</button>
        <button onClick={()=>document.getElementById("confirm"+item.id).style.display=("block")}>Delete Playlist</button>
        <button id={"confirm"+item.id} style={{display:"none"}} onClick={()=>deletePlaylist(item.id)}>click here to confirm</button>
       </div>
            ))
      }
      </div>
    </div>
  )
}

export default PlaylistList;

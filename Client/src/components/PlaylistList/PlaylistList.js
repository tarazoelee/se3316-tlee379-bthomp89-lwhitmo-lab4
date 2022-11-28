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

  function addPlaylist(name){
    const names=[];
    //get an array of current playlist names
    for(let i=0; i<auth.length;i++){
      names.push(auth[i].Name)
    }
    //if there is a playlist with that name already, do not add the playlist
    if(names.includes(name)){
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
    console.log(item.length)
      return item.length
  }
  return (
    <div className='playlist-container'>
      <h3 className='title'>Your playlists</h3>
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
      <div className='playlist-container'>{
        auth.map((item, arrRef) => ( 
        arrRef=item.Songs,
        <div key = { item.id } className='track-container' >
        <p className='text-black fs-5'>{item.Name}, Creators Name: {item.User}, {getLength(arrRef)} tracks, Time: {item.Time}</p>
        <button onClick={()=>openPlaylist(item.id)}>Open Playlist</button>
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

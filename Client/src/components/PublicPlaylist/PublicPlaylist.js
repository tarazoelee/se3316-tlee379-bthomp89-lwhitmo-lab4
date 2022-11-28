import '../PlaylistList/PlaylistList'
import {React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Popup from '../Popup/popup';
import { useAuth } from "../../contexts/AuthContext"


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
  
  const history = useNavigate();

  //calls fetch data once when page loaded
  useEffect(() => {
      fetchData()
  }, []);
  useEffect(()=>{
    testVisibility();
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
  

  function openPlaylist(passed){
    history('/playlistview/'+passed) //open new page for that playlist
  }
  function testVisibility(){
    const newMap=[]
    items.map((item)=>{
      if(item.visibility === "public"){
        newMap.push(item)
      }
    })
    setAuth(newMap)
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
      <h3 className='title'>Public Playlists</h3>
      <div>
  </div>
      <div className='playlist-container'>{
        auth.map((item, arrRef) => ( 
        arrRef=item.Songs,
        <div key = { item.id } className='track-container' >
        <p className='text-black fs-5'>{item.Name}, Creators Name: {item.User}, {getLength(arrRef)} tracks, Time: {item.Time}</p>
        <button onClick={()=>openPlaylist(item.id)}>Open Playlist</button>
       </div>
                    ))
                  }
      </div>
  
    </div>
  )
}

export default PlaylistList;

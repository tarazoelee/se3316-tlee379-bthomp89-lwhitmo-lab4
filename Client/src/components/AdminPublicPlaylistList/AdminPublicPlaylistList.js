import '../PlaylistList/PlaylistList'
import {React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './AdminPublicPlaylistList.css'

//get all the playlists that are public to display
function AdminPublicPlaylistsList() {
  const [items, setItems] = useState([])
  const [auth, setAuth]= useState([]);
  const [DataisLoaded, setLoading]= useState(false)
  const [isOpen, setIsOpen] = useState(false);

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
  
  //open new page for that playlist
  function openPlaylist(passed){
    history('/adminplaylistview/'+passed) 
  }

  //if public add to auth, to be displayed
  function testVisibility(){
    const newMap=[]
    let i =0; //up to ten playlists
    items.map((item)=>{
      if(item.visibility === "public" && i<10){
        newMap.push(item)
        i++;
      }
    })
    setAuth(newMap)
  }

//get the length of the list of songs
  function getLength (item){
    if(item===undefined){
      return 0
    }
      return item.length
  }
  return (
    <div className='public-playlist-container'>
      <h3 className='title'>Public Playlists</h3>
      <div>
  </div>
      <div className='public-playlist-list-container'>{
        auth.map((item, arrRef) => ( 
        arrRef=item.Songs,
        <div key = { item.id } className='track-container' onClick={()=>openPlaylist(item.id)}>
        <p className='playlist-title'>{item.Name}</p>
        <p className='playlist-details'>Creator: {item.User}, {getLength(arrRef)} tracks, Time: {item.Time}</p>
       </div>
            ))
                  }
      </div>
    </div>
  )
}

export default AdminPublicPlaylistsList;

import {React, useState, useEffect} from 'react'
import '../Playlist/Playlist'
import { useNavigate, useParams } from "react-router-dom";
import './UnAuthPlaylist.css'
import { useAuth } from "../../contexts/AuthContext"

//playlist for users that are not logged in
function UnAuthPlaylist() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [play, setPlay]=useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const params = useParams();
    const history = useNavigate();
    const { currentUser } = useAuth()

    function goBack(){
        history("/userdash")
    }
    //open in a new tab
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    //get the description of the playlist
    function getDescription(){
        fetch("/api/playlist/"+params.id)
        .then((res)=>res.json())
        .then((json)=>{
            setPlay(json);
        })
    }
    //get the information about the tracks - from the array of songs
    function fetchDataInfo(pass){
        fetch("/api/tracks/"+pass)
            .then((res) => res.json())
            .then((data) => {
                nItems.push(data);
                setLoading(true);
            ;
        })
    } 
    //this retruns an array of the songs that are on the playlist 
    function fetchData(){
        fetch("/api/playlist/getsongs/"+params.id)
            .then((res) => res.json())
            .then((json) => {
                    setItems(json.Songs);
                    setLoading(true);
            ;
        })
    }
    
    //add comments to a playlist
    function addComment(rev){
        fetch("/api/playlist/review/"+params.id,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"review": rev, "user": currentUser.email.substr(0, currentUser.email.indexOf('@'))})
          })
    }

    //use effect to call all needed inforamtion amd call fetching data info for every song
    useEffect(() => {
        fetchData();
        getDescription();
        console.log(items)
        items.map((item)=>{
            console.log(item)
            fetchDataInfo(item)
            console.log(nItems)
        })
    }, [items.length]);

  return (
    <div className='dash-container'>
    <div className='playlist-container'>
    <h3 className="text-center mb-4">{play.Name}</h3>
    <h4 className="text-center mb-4">{play.visibility}</h4>
      {play.Description}
      {items.length > 0 && (
        <div>
          {nItems.map((item)=>{
            return(
                <div class="track-container"key={item.trackId}>Title: {item.trackTitle} Album: {item.albumTitle} Artist: {item.artistName}
               <button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.artistName+"-"+item.albumTitle+" "+item.trackTitle)}>Play on Youtube</button> </div>
            )
          })}
        </div>
      )}
      </div>
      <div className='right-column'>
        <div className='go-back'>
            <button onClick={goBack} class="btn btn-outline-light">Go Back</button>
        </div>
        <div>
            <input id='comm-input' placeholder='review'></input>
            <button onClick={()=> addComment(document.getElementById('comm-input').value)}>add</button>
        </div>
    </div>
    </div>
  )
}

export default UnAuthPlaylist;

import {React, useState, useEffect} from 'react'
import '../Playlist/Playlist'
import SearchTracksForPlaylist from '../SearchTracksForPlaylists/SearchTracksForPlaylist';
import PlaylistInformation from '../Playlist Information/PlaylistInformation';
import { useNavigate, useParams } from "react-router-dom";

function UnAuthPlaylist() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [play, setPlay]=useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const params = useParams();
    const history = useNavigate();
    function goBack(){
        history("/opendash")
    }
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    function getDescription(){
        fetch("/api/playlist/"+params.id)
        .then((res)=>res.json())
        .then((json)=>{
            setPlay(json);
        })
    }
    function fetchDataInfo(pass){
        fetch("/api/tracks/"+pass)
            .then((res) => res.json())
            .then((data) => {
                nItems.push(data);
                setLoading(true);
            ;
        })
    } 
    function fetchData(){
        fetch("/api/playlist/getsongs/"+params.id)
            .then((res) => res.json())
            .then((json) => {
                    setItems(json.Songs);
                    setLoading(true);
            ;
        })
    }
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
        <div className='searchtracks-container'>
        </div>
        <div className='playlist-container'>
        <h3 className="text-center mb-4">{play.Name}</h3>
      <h4 className="text-center mb-4">{play.visibility}</h4>
      {play.Description}
      {items.length > 0 && (
        <div>
          {nItems.map((item)=>{
            return(
                console.log(item),
                <div class="track-container"key={item.trackId}>Title: {item.trackTitle} Album: {item.albumTitle} Artist: {item.artistName}
               <button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.artistName+"-"+item.albumTitle+" "+item.trackTitle)}>Play on Youtube</button> </div>
            )
          })}
        </div>
      )}
      </div>
        <div className='go-back'>
            <button onClick={goBack} class="btn btn-outline-light">Go Back</button>
        </div>
    </div>
  )
}

export default UnAuthPlaylist;

import {React, useState, useEffect} from 'react'
import './PlaylistInformation.css'
import {useParams} from 'react-router-dom'


function PlaylistInformation() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [play, setPlay]=useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const params = useParams();
    function fetchData(){
        fetch("/api/playlist/getsongs/"+params.id)
            .then((res) => res.json())
            .then((json) => {
                    setItems(json.Songs);
                    setLoading(true);
            ;
        })
    }

    //open new song in tab
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    function addDescription(desc){
        fetch("/api/playlist/description/"+params.id,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"description": desc })
          })
    }
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

    //useEffect(fetchDataInfo(),[])
    
  return (
    <div className='playlist-container'>
      <h3 className="text-center mb-4">Information</h3>
      <div>
        {play.Description}
        <p></p>
        Update/Add Description Here:  
        <input id ="desc"></input>
        <button onClick={()=>addDescription(document.getElementById("desc").value)}>Submit</button>
      </div>
      <div>
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
    </div>
  )
}

export default PlaylistInformation;

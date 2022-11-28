import {React, useState, useEffect} from 'react'
import './PlaylistInformation.css'
import {useParams} from 'react-router-dom'
import { Alert } from 'react-bootstrap'

//information about each of the playlists
function PlaylistInformation() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [play, setPlay]=useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const params = useParams();
    let total;
    let time=0;
    //fetch all the songs this is an array of the song ids
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
    //create the description for the playlists
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
    //get existing description
    function getDescription(){
        fetch("/api/playlist/"+params.id)
        .then((res)=>res.json())
        .then((json)=>{
            setPlay(json);
        })
    }
    //find the total time for the playlist
    function addTime(){
        console.log(nItems)
        total =  nItems
            .map(el => el.titleDuration.split(':'))
            .reduce((p, c) => {
            p.minutes += Number(c[0]);
            p.seconds += Number(c[1]);
            return p;
            },{ minutes: 0, seconds: 0 });

        const whole = Math.floor(total.seconds / 60);
        total.minutes += whole;
        total.seconds = total.seconds % 60;

        console.log(total.minutes+":"+total.seconds)
        time=total.minutes+":"+total.seconds
        //post the time to the playlist
        fetch("/api/playlist/addtime/"+params.id,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"time": time })
          })
    }
    //fetch the tracks information that is on the playlist
    function fetchDataInfo(pass){
        fetch("/api/tracks/"+pass)
            .then((res) => res.json())
            .then((data) => {
                nItems.push(data);
                setLoading(true);
            ;
        })
    } 
    //for the length of the number of songs on the playlist cqll the get data, also get the description for the playlist
    useEffect(() => {
        fetchData();
        getDescription();
        console.log(items)//idk why but it doesnt work without this
    
        items.map((item)=>{
            console.log(item)
            fetchDataInfo(item)
            console.log(nItems)
        })
    }, [items.length]);
//change the visibility to public
    function changeToPublic(){
        fetch('/api/playlist/changetopublic/'+params.id)
        alert("changed to public")
    }
    //change the visibility to private
    function changeToPrivate(){
        fetch('/api/playlist/changetoprivate/'+params.id)
        alert("changed to private")
    }
    
  return (
    <div className='playlist-container'>
      <h3 className="text-center mb-4">{play.Name}</h3>
      <h4 className="text-center mb-4">{play.visibility}</h4>
      <div>
        <button onClick={()=>changeToPublic()}>Change to public</button>
        <button onClick={()=>changeToPrivate()}>Change to private</button>
        {play.Description}
        <p></p>
        Update/Add Description Here:  
        <input id ="desc"></input>
        <button onClick={()=>addDescription(document.getElementById("desc").value)}>Submit</button>
      </div>
      <div onClick={addTime()}>Total time: {time}</div>
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

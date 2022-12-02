import {React, useState, useEffect} from 'react'
import './PlaylistInformation.css'
import {useParams} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"

//information about each of the playlists
function PlaylistInformation() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [items2, setItems2] = useState([])
    const [auth, setAuth]= useState([]);
    const [play, setPlay]=useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const { currentUser } = useAuth()
    const params = useParams();
    let total;
    let time=0;
    const newMap=[]
    function refreshPage() {
      window.location.reload(false);
    }
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
    async function fetchPlays(){
      await fetch("/api/playlist")
          .then((res) => res.json())
          .then((json) => {
              items2.push(json);
              setLoading(true);
          ;
      })
      console.log(items2)
      items2[0].map((item)=>{
      if(item.UserEmail == currentUser.email){
        newMap.push(item)
      }
      })
      setAuth(newMap)
  }
    function deleteSong(id, song){
      fetch('/api/playlist/deleteSong/'+id+'/'+song,{
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",
          "Content-length" : 3
        }
      })
      refreshPage()
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
          refreshPage()
    }
    //get existing description
    function getDescription(){
        fetch("/api/playlist/"+params.id)
        .then((res)=>res.json())
        .then((json)=>{
            setPlay(json);
        })
    }

    async function changeName(name){
      await fetchPlays()
      const names=[];
      console.log(newMap)
      //get an array of current playlist names
      for(let i=0; i<newMap.length;i++){
        names.push(newMap[i].Name)
      }
      console.log(names)
      //if there is a playlist with that name already, do not add the playlist
      if(names.includes(name)){
        return alert("choose a new name")
      }
      fetch('/api/playlist/changeName/'+params.id,{
          method:'POST',
          headers:{
            "Content-Type": "application/json",
            "Content-length" : 2
          },
          body: JSON.stringify({"name": name })
        })
        refreshPage()
    }
    //find the total time for the playlist
    function addTime(){
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
        refreshPage()
    }

    //change the visibility to private
    function changeToPrivate(){
        fetch('/api/playlist/changetoprivate/'+params.id)
        alert("changed to private")
        refreshPage()
    }

    
  return (
    <div className='playlist-info-container'>
      <h3 className="text-center mb-4">{play.Name}</h3>
      <div className="text-center mb-4">{play.visibility}</div>
      <div className='play-details-container'>
        <div className='change-btn-cont'>
          <button className="change-btn" onClick={()=>changeToPublic()}>Change to public</button>
          <button className="change-btn" onClick={()=>changeToPrivate()}>Change to private</button>
        </div>
        <div> {play.Description}</div>
        <div onClick={addTime()}>Total time: {time}</div>
        <div className='descript-container'>  
          <input id ="desc" placeholder='update or add a description'></input> 
           <button className="change-btn" onClick={()=>addDescription(document.getElementById("desc").value)}>Submit</button>
        </div>
        <div className ='changeName'>
      <input id ="n" placeholder='change name'></input> 
      <button className="change-btn" onClick={()=>changeName(document.getElementById("n").value)}>Submit</button>
  </div>
      </div>
      <div>
      {items.length > 0 && (
        <div>
          {nItems.map((item)=>{
            return(
                <div class="track-container"key={item.trackId}>Title: {item.trackTitle} Album: {item.albumTitle} Artist: {item.artistName}
               <button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.artistName+"-"+item.albumTitle+" "+item.trackTitle)}>Play on Youtube</button> 
               <button class= "playsong-btn" onClick={()=> deleteSong(params.id, item.trackId)}>Delete song</button>
               </div>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}

export default PlaylistInformation;

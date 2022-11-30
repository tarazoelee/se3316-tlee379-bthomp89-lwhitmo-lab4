import {React, useState, useEffect} from 'react'
import '../Playlist/Playlist'
import { useNavigate, useParams } from "react-router-dom";
import './AdminUnAuthPlaylist.css'
import { useAuth } from "../../contexts/AuthContext"

//playlist for users that are not logged in
function AdminUnAuthPlaylist() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [play, setPlay]=useState([])
    const [rating, setRate] = useState()
    const [DataisLoaded, setLoading]= useState(false)
    const params = useParams();
    const history = useNavigate();
    const { currentUser } = useAuth()

    function goBack(){
        history("/admin")
    }

    function refreshPage() {
        window.location.reload(false);
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
    
     //change the visibility of review 
    function changeToPrivate(comm,date,user,vis){
        fetch('/api/playlist/changereviewvisibility/'+params.id,
        {
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"comm": comm, "date": date, "user":user, "vis":vis})
        })
        alert("changed visibility")
        refreshPage();
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

     //When track is clicked display additional info 
    function getClicked(id, album, time){
        const track = document.getElementById(id);

        //only create additional children if they don't exist
        if(!track.children[1]){
            const div = document.createElement('div');
            const info = document.createTextNode("Album: " + album + ' Length: ' + time)
            const close = document.createElement('button');
            
            div.className='clicked-info';
            close.className='close-btn'
            
            close.appendChild(
                document.createTextNode('close')
            )
            div.appendChild(info);
            div.appendChild(close);
            track.appendChild(div);
            close.addEventListener("click",()=>removeClicked(id));
        }
    }

    function removeClicked(id){
        const track = document.getElementById(id);
        while(track.children[1]){
            track.removeChild(track.children[1])
        }
    }

  return (
    <div className='unauthdash-container'>
    <div className='playlist-container'>
         <div className='go-back'>
            <button onClick={goBack} className="btn btn-outline-light">Go Back</button>
        </div>
        <h3 className="text-center mb-4">{play.Name}</h3>
        <h4 className="text-center mb-4">{play.visibility}</h4>
        <div className='description'>
            {play.Description}
            <div>{rating}</div>
        </div>
      {items.length > 0 && (
        <div className='unauth-songs-container'>
          {nItems.map((item)=>{
            return(
                <div key = { item.trackId } id={item.trackId} className='unauth-track-container'>
                 <div className='default-track' onClick={() => getClicked(item.trackId, item.albumTitle, item.trackDuration)}>
                    <div>{ item.trackTitle }, Artist: { item.artistName } </div>
                    <div><button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.artistName+"-"+item.albumTitle+" "+item.trackTitle)}>Play Song</button> </div>
                </div> 
                </div>
               )
          })}
        </div>
      )}
      </div>
      <div className='right-column'>
        <div>
            {
            play.Reviews && play.Reviews.map(item => 
                <div key={item.date+item.user} className="review-item">
                    <div>{item.comm}, {item.user}, {item.date}, public: {(item.visibility).toString()}</div>
                    <button onClick={() => changeToPrivate(item.comm,item.date,item.user,item.visibility)}>switch visibility</button>
                </div>)
            }
        </div>
    </div>
    </div>
  )
}
//,item.date,item.user,item.visibility
export default AdminUnAuthPlaylist;

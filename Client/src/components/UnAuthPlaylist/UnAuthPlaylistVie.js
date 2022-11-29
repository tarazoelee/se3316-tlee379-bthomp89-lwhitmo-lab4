import {React, useState, useEffect} from 'react'
import '../Playlist/Playlist'
import { useNavigate, useParams } from "react-router-dom";
import './UnAuthPlaylist.css'
import { useAuth } from "../../contexts/AuthContext"
import ReactStars from "react-rating-stars-component";

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
    
    function setRating(newRating){
        fetch("/api/playlist/rating/"+params.id,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"rating": newRating, "user": currentUser.email.substr(0, currentUser.email.indexOf('@'))})
          })
          calcRating();
    }

    function calcRating(){
        const div = document.getElementById("rating-container");
        const ratingDiv = document.createElement('div')
        var num = play.Ratings.length;
        var sum = 0;
        play.Ratings.map((item) => {
            var rating = parseInt(item.rating);
            sum+=rating;
        });
        while(div.firstElementChild){
            div.removeChild(div.firstElementChild);
        }
        var avg = (sum/num);
        div.appendChild(ratingDiv) 
        ratingDiv.appendChild(document.createTextNode(avg))
    
    }
    //add comments to a playlist
    function addComment(rev){
        if(window.confirm("Are you sure?")==true){
        fetch("/api/playlist/review/"+params.id,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"review": rev, "user": currentUser.email.substr(0, currentUser.email.indexOf('@'))})
          })
        refreshPage();
        }
          else{
            return null
        }
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
             <ReactStars
            count={5}
            onChange={setRating}
            size={24}
            activeColor="#ffd700" />
            <div id='rating-container'></div>
            <input id='comm-input' placeholder='add a review'></input>

            <button onClick={()=> addComment(document.getElementById('comm-input').value)}>add</button>
            {play.Reviews && play.Reviews.map(item => 
                <div key={item.date+item.user}>
                    <div>{item.comm}, {item.user}, {item.date}</div>
                </div>)
            }
        </div>
    </div>
    </div>
  )
}

export default UnAuthPlaylist;

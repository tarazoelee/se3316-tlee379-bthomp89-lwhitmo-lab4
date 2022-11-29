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
    const [rating, setRate] = useState()
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
        getDescription()
        const div = document.getElementsByClassName("description")

        var num = play.Ratings.length;
        var sum = 0;
        play.Ratings.map((item) => {
            var rating = parseInt(item.rating);
            sum+=rating;
        });
        var avg = (sum/num);
        setRate(avg);
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
    console.log('clicked')
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
             <ReactStars
            count={5}
            onChange={setRating}
            size={24}
            activeColor="#ffd700" />

            <input id='comm-input' placeholder='add a review'></input>
            <button onClick={()=> addComment(document.getElementById('comm-input').value)}>add</button>
            {play.Reviews && play.Reviews.map(item => 
                <div key={item.date+item.user} className="review-item">
                    <div>{item.comm}, {item.user}, {item.date}</div>
                </div>)
            }
        </div>
    </div>
    </div>
  )
}

export default UnAuthPlaylist;

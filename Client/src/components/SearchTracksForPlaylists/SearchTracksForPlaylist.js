import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Fuse from 'fuse.js';
import '../SearchTracks/SearchTracks.css'
import '../SearchTracksForPlaylists/Search.css'


//search tracks for playlist function cuz i needed to add a button to the tracks for adding them to a playlist
export default function SearchTracksForPlaylist(){
    const [items, setItems] = useState([])
    const [toggle, setToggle] = useState(false);
    const [DataisLoaded, setLoading]= useState(false)
    const [query, updateQuery] = useState('');
    const params = useParams();
    function refreshPage() {
        window.location.reload(false);
      }

    //define fuse results search
    const fuse = new Fuse(items, {
    keys: ['artistName', 'trackTitle','albumTitle'],
    threshold:0.5
    })
    //create fuse result search 
    const result = fuse.search(query);
    const tracksResults = result.map(track => track.item);


    function onSearch({ currentTarget }) {
        updateQuery(currentTarget.value);
        }

    function toggleDiv(){
        setToggle(!toggle)
    }

    //open new song in tab
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };


    //calls fetch data once when page loaded
    useEffect(() => {
        fetchData();
    }, []);

    //Fetch all track data 
    function fetchData(){
        fetch("/api/tracks")
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
//add the clicked song to the current playlist
    function addSongs(id, tracks){
        fetch("/api/playlist/add/"+id,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 2
            },
            body: JSON.stringify({"tracks": [tracks]})
          })
          refreshPage()
    }
   
    //Display tracks
    return (
        <div className = "searchtracks-container">
            <input className='searchtracks-input' placeholder='Discover Music' value={query} onChange={onSearch}></input>
             {
               tracksResults.map((item) => ( 
                <div key = { item.id } id={item.id} className='track-container'>
                 <div key = { item.id } className='default-track' onClick={() => getClicked(item.id, item.albumTitle, item.trackDuration)}>
                    <div>{ item.trackTitle }, Artist: { item.artistName } </div>
                    <div><button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.artistName+"-"+item.albumTitle+" "+item.trackTitle)}>Play Song</button> 
                    <button class='add-btn' onClick={()=>addSongs(params.id, item.trackId)}>add to playlist</button>
                    </div>
                </div> 
                </div>
                ))
            }
        </div>
    );
}

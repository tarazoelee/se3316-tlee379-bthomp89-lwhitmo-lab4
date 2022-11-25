import './SearchTracks.css'
import {React, useState, useEffect} from 'react';
import Fuse from 'fuse.js';

export default function SearchTracks(){
    const [items, setItems] = useState([])
    const [toggle, setToggle] = useState(false);
    const [DataisLoaded, setLoading]= useState(false)
    const [query, updateQuery] = useState('');

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
        console.log(toggle);
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
   
    //Display tracks
    return (
        <div className = "searchtracks-container">
            <input className='searchtracks-input' placeholder='Find music!' value={query} onChange={onSearch}></input>
             {
               tracksResults.map((item) => ( 
                <div key = { item.id } id={item.id} className='track-container'>
                 <div key = { item.id } className='default-track' onClick={() => getClicked(item.id, item.albumTitle, item.trackDuration)}>
                    <div>{ item.trackTitle }, Artist: { item.artistName } </div>
                    <div><button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.trackTitle)}>Play Song</button> </div>
                </div> 
                </div>
                ))
            }
        </div>
    );
}

import './SearchTracks.css'

// export default SearchTracks
import {React, useState, useEffect} from 'react';

export default function SearchTracks(){
    const [items, setItems] = useState([])
    const [toggle, setToggle] = useState(false);
    const [DataisLoaded, setLoading]= useState(false)
    const [inputText, setInputText] = useState("");
    
    //convert input to lowercase
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

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
        console.log(id);
        const track = document.getElementById(id);
        while(track.children[1]){
            track.removeChild(track.children[1])
        }
    }
   
    //Display tracks
    return (
        //Search tracks input
        <div className = "searchtracks-container">
            <input className='searchtracks-input' placeholder='Find music!' onChange={inputHandler}></input>
             {
                items.filter(item => {
                    if(inputText===''){ 
                        return item;
                    }
                    else if (item.trackTitle.toLowerCase().includes(inputText) || item.albumTitle.toLowerCase().includes(inputText) || item.artistName.toLowerCase().includes(inputText)) {
                        return item; //display searched tracks 
                    }
                }).map((item) => ( 
                    //if not clicked, only display tracks 
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

import './SearchTracks.css'

// export default SearchTracks
import {React, useState, useEffect} from 'react';

export default function SearchTracks(){
    const [items, setItems] = useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const [inputText, setInputText] = useState("");
        let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };

   useEffect(() => {
    fetchData();
    console.log('use effect running')
  }, []);

    function fetchData(){
        fetch("/api/tracks")
            .then((res) => res.json())
            .then((json) => {
                    setItems(json);
                    setLoading(true);
            ;
        })
    }

     if (!DataisLoaded){ 
        return <div> <h1 className='text-white fs-5'> loading.... </h1> </div> ;
     }
   
    return (
        <div className = "searchtracks-container">
            <input className='searchtracks-input' placeholder='Find music!' onChange={inputHandler}></input>
             {
                items.filter(item => {
                    if(inputText===''){
                        return item;
                    }
                    else if (item.trackTitle.toLowerCase().includes(inputText) || item.albumTitle.toLowerCase().includes(inputText) || item.artistName.toLowerCase().includes(inputText)) {
                        return item;
                    }
                }).map((item) => ( 
                 <div key = { item.id } className='track-container' >
                    <div>{ item.trackTitle }, Album: { item.albumTitle }, Artist: { item.artistName } </div>
                    <div><button class="playsong-btn" onClick={() => openInNewTab("https://www.youtube.com/results?search_query="+item.trackTitle)}>Play Song</button>
                     </div>
                </div>
                ))
           
            }
        </div>
    );
}

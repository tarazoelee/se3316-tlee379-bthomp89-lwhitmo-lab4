import './SearchTracks.css'

// export default SearchTracks
import {React, useState} from 'react';

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



    // ComponentDidMount is used to execute the code 
    function getData(){
        fetch("/api/tracks")
            .then((res) => res.json())
            .then((json) => {
                    setItems(json);
                    setLoading(true);
            ;
        })
    console.log("printing")
    };
    getData();

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
                    <p>{ item.trackTitle }, Album: { item.albumTitle }, Artist: { item.artistName } 
                    <button class="btn btn-outline-dark" onClick={() => openInNewTab(item.trackUrl)}>Play Song</button></p>
                </div>
                ))
           
            }
        </div>
    );
}

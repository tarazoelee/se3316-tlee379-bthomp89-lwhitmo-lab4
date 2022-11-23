import './SearchTracks.css'

// function SearchTracks() {
//   return (
//     <div className='searchtracks-container'>
//       <input className='searchtracks-input' placeholder='Find music!'></input>
//       <div className='searchresults-container'>Placeholder for results!</div>
//     </div>
//   )
// }

// export default SearchTracks
import { Component, React, useState} from 'react';

export default function SearchTracks(){
    const [items, setItems] = useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const [inputText, setInputText] = useState("");
        let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    var query;
 
    // ComponentDidMount is used to execute the code 
    function componentDidMount(){
        fetch(
            "/api/tracks")
            .then((res) => res.json())
            .then((json) => {
                    setItems(json);
                    setLoading(true);
            ;
        })
    };
    componentDidMount();

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
                    <p>{ item.trackTitle }, Album: { item.albumTitle }, Artist: { item.artistName } </p>
                </div>
                ))
           
            }
        </div>
    );
}

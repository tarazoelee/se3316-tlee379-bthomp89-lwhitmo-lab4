import {React, useState, useEffect} from 'react'
import './PlaylistInformation.css'

function PlaylistInformation() {
    const [items, setItems] = useState([])
    const [DataisLoaded, setLoading]= useState(false)
    function fetchData(){
        fetch("/api/playlist")
            .then((res) => res.json())
            .then((json) => {
                    setItems(json);
                    setLoading(true);
            ;
        })
    }
    function fetchTracks(){
        fetch("/api/tracks")
            .then((res) => res.json())
            .then((json) => {
                    setItems(json);
                    setLoading(true);
            ;
        })
    }
    useEffect(() => {
        fetchData();
        fetchTracks();
    }, []);
  return (
    <div className='playlist-container'>
      <h3 className="text-center mb-4">Information</h3>
      {items.map((item) => ( 
            <div key = { item.id } className='track-container' >
               <p>{ item.trackTitle }, Album: { item.albumTitle }, Artist: { item.artistName } </p>
            </div>
      ))}
    </div>
  )
}

export default PlaylistInformation;

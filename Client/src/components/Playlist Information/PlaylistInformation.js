import {React, useState, useEffect} from 'react'
import './PlaylistInformation.css'
import {useParams} from 'react-router-dom'


function PlaylistInformation() {
    const [items, setItems] = useState([])
    const [nItems, setNItems]=useState([])
    const [DataisLoaded, setLoading]= useState(false)
    const params = useParams();
    function fetchData(){
        fetch("/api/playlist/getsongs/"+params.id)
            .then((res) => res.json())
            .then((json) => {
                    setItems(json.Songs);
                    setLoading(true);
            ;
        })
    }

    function fetchDataInfo(pass){
        fetch("/api/tracks/"+pass)
            .then((res) => res.json())
            .then((data) => {
                nItems.push(data);
                setLoading(true);
            ;
        })
    } 
    useEffect(() => {
        fetchData();
        console.log(items)
    
        items.map((item)=>{
            console.log(item)
            fetchDataInfo(item)
            console.log(nItems)
        })
    }, [items.length]);

    //useEffect(fetchDataInfo(),[])
    
  return (
    <div className='playlist-container'>
      <h3 className="text-center mb-4">Information</h3>
      <div>
      {items.length > 0 && (
        <div>
          {nItems.map((item)=>{
            return(
                console.log(item),
                <li key={item.trackId}>Title: {item.trackTitle} Album: {item.albumtitle} Artist: {item.artistName}</li>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}

export default PlaylistInformation;

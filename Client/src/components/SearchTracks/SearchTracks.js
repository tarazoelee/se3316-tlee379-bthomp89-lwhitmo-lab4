// import React from 'react'
// import './SearchTracks.css'

// function SearchTracks() {
//   return (
//     <div className='searchtracks-container'>
//       <input className='searchtracks-input' placeholder='Find music!'></input>
//       <div className='searchresults-container'>Placeholder for results!</div>
//     </div>
//   )
// }

// export default SearchTracks
import { Component } from 'react';

class Tracks extends Component {

    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
"/api/tracks")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
        <div className = "App">
            <h1> Tracks </h1>  {
                items.map((item) => ( 
                <ol key = { item.id } >
                    Track Name: { item.trackTitle }, 
                    Album: { item.albumTitle }, 
                    Artist: { item.artistName } 
                    </ol>
                ))
            }
        </div>
    );
}
}

export default Tracks; 
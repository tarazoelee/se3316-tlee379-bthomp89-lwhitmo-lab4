import { Component } from 'react';

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Tracks: []
        }
    }

    componentDidMount() {
        fetch('/api/tracks')
            .then(response => response.json())
            .then(data => {
                    this.setState({tracks: data});
            });
    }

    render() {
        return (
            <ul>
             {this.tracks?.map(track => (
                    <li>track number: {track.trackNumber}, title: {track.trackTitle}</li>
                ))}
            </ul>
        )
    }
}

export default Tracks; 
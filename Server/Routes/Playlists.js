const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");

const {playlists} = require('../handler/playlists');

//get all the current playlists from firebase
router.get('/', playlists);
//add tracks to a playlist
router.post('/add/:id', (req,res)=>{
    const playlistID= req.params.id;
    const tracks = req.body.tracks;

    addSongs(playlistID, tracks)
    res.send("done")
    
})
//create a new playlist
router.post('/create', (req,res)=>{
    const name= req.body.name;
    const email= req.body.email;
    addPlaylist(name, email)
    res.send()
})

//create new playlist function
async function addPlaylist(name, email){
    const res = await db.collection('Playlists').add({
        Name: name,
        UserEmail: email
      });
      
      console.log('Added document with ID: ', res.id);
      
}
//add songs function
async function addSongs(id, tracks){
    const res = await db.collection('Playlists').doc(id).update({
        Songs: tracks
    })

    console.log("Added tracks: "+tracks+" to: "+id)
}

module.exports = router;
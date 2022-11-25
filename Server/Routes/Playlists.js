const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");

const {playlists} = require('../handler/playlists');

//get all the current playlists from firebase
router.get('/', playlists);
//add tracks to a playlist
router.post('/add', (req,res)=>{
    console.log(db.collection("playlists").listDocuments)
})
//create a new playlist
router.post('/create', (req,res)=>{
    addPlaylist("tester")
    res.send()
})

async function addPlaylist(name){
    const res = await db.collection('Playlists').add({
        Name: name
      });
      
      console.log('Added document with ID: ', res.id);
      
}

module.exports = router;
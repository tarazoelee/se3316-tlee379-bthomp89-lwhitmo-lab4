const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");

const {playlists} = require('../handler/playlists');

//get all the current playlists from firebase
router.get('/', playlists);

//get the songs on a playlist
router.get('/getsongs/:id',(req,res)=>{
    const playlist = req.params.id;
    getPlaySongs(playlist).then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})
//add tracks to a playlist
router.post('/add/:id', (req,res)=>{
    const playlistID= req.params.id;
    const tracks = req.body.tracks;

    addSongs(playlistID, tracks)
    res.send("done")
    
})
//get specific playlist
router.get("/:id", (req,res)=>{
    const playlist =req.params.id;
    getPlaylist(playlist).then((data)=>{
        res.send(data)
    })
})
//create a new playlist
router.post('/create', (req,res)=>{
    const name= req.body.name;
    const email= req.body.email;
    const user=req.body.user;
    addPlaylist(name, email, user)
    res.send()
})
//add description
router.post('/description/:id', (req,res)=>{
    console.log("called")
    const playlistID= req.params.id;
    const description = req.body.description;

    addDescription(playlistID, description)
    res.send()
})
//delete a playlist
router.delete('/deletePlaylist/:id', (req,res)=>{
    const playlist = req.params.id;
    deletePlaylist(playlist);
    res.send()
})

router.post('/addtime/:id', (req, res)=>{
    const playlist = req.params.id;
    const time = req.body.time;

    addTime(playlist, time);
    req.send()
})

//create new playlist function
async function addPlaylist(name, email, user){
    const res = await db.collection('Playlists').add({
        Name: name,
        UserEmail: email,
        User: user,
        Songs:[]
      });
      
      console.log('Added document with ID: ', res.id);
      
}
//add songs function
async function addSongs(id, tracks){
    const FieldValue = require('firebase-admin').firestore.FieldValue;
    for (track in tracks){
        const res = await db.collection('Playlists').doc(id).update({
            Songs: FieldValue.arrayUnion(tracks[track])
        })
    }

    console.log("Added tracks: "+tracks+" to: "+id)
}


async function addDescription(id, desc){
    //const FieldValue = require('firebase-admin').firestore.FieldValue;
    const res = await db.collection('Playlists').doc(id).update({
        Description: desc
    })

    console.log("Added description to: "+id)
}


async function getPlaySongs(id){
    const play = db.collection('Playlists').doc(id);
    const doc = await play.get();
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    console.log(doc.data().Songs);
    }
    return doc.data()
}

async function getPlaylist(id){
    const play = db.collection("Playlists").doc(id);
    const doc = await play.get();
    console.log(doc.data())
    return doc.data()
}
//delete a playlist
async function deletePlaylist(id){
    const res = await db.collection("Playlists").doc(id).delete()
}

async function addTime(id, time){
    const res = await db.collection('Playlists').doc(id).update({
        Time: time
    })

    console.log("Added time to: "+id)
}
module.exports = router;
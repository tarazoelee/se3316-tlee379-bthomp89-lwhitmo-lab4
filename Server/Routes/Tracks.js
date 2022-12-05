const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin.js");

const {tracks} = require('../Handler/Tracks.js');

router.get('/', tracks)
//get track info
router.get('/:id', (req, res)=>{
    const id = req.params.id;
    lookForTracks(id).then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})

async function lookForTracks(id){
    const citiesRef = db.collection('Tracks');
    const snapshot = await citiesRef.where('trackId', '==', Number(id)).limit(1).get();
    if (snapshot.empty) {
    console.log('No matching documents.');
    return;
    }  
    snapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    sending ={
        "trackId": doc.data().trackId,
        "trackTitle": doc.data().trackTitle,
        "artistName": doc.data().artistName,
        "albumTitle": doc.data().albumTitle,
        "titleDuration": doc.data().trackDuration
    }
    })
    //console.log("break")
    console.log(sending)
    return sending
    
               
}
module.exports = router;
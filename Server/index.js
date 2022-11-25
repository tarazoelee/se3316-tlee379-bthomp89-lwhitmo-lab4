const express = require('express');
const app = express();
const tracks = require('./routes/tracks');
const playlists =require('./Routes/Playlists')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//const firebase = require('firebase');

app.use('/api/tracks', tracks);

app.use('/api/playlist', playlists)

app.get('/api', (request, response) => {
    response.send('Hello world from Express!');
});

app.listen(1234,()=>{
    console.log('Running on port 1234!')
});
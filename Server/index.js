const express = require('express');
const app = express();
const users = require('./routes/users');
const tracks = require('./routes/tracks');
//const firebase = require('firebase');

app.use('/api/users', users);
app.use('/api/tracks', tracks);

app.get('/api', (request, response) => {
    response.send('Hello world from Express!');
});

app.listen(1234,()=>{
    console.log('Running on port 1234!')
});
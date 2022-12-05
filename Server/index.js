const express = require("express");
const app = express();
const tracks = require("../Routes/tracks");
const playlists = require("../Routes/Playlists");
const users = require("../Routes/Users");
const bodyParser = require("body-parser");
const policies = require("../Routes/Policies")
const complaints = require('../Routes/Complaints')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//const firebase = require('firebase');

app.use("/api/tracks", tracks);
app.use("/api/users", users);
app.use("/api/playlist", playlists);
app.use("/api/policies", policies);
app.use('/api/complaints', complaints);

app.get("/api", (request, response) => {
  response.send("Hello world from Express!");
});

app.listen(1234, () => {
  console.log("Running on port 1234!");
});

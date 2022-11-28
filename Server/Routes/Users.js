const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");

const { users } = require("../handler/users");

//Get all users from database
router.get("/", users);

//Add user to database
router.post("/adduser/:id", (req, res) => {
  const uid = req.params.id;
  const email = "jstest@gmail.com"; //needs to be in the req.body
  const isAdmin = false;
  const disabled = false;

  addUser(uid, email, isAdmin, disabled);
  res.send("Added User");
});

//Get a specfific user given email

//Get a specific user given uid

//Update isAdmin flag for a specific user

//Update disabled flag for a given user

async function addUser(uid, email, isAdmin, disabled) {
  const FieldValue = require("firebase-admin").firestore.FieldValue;

  const res = await db.collection("Users").add({
    uid: uid,
    email: email,
    isAdmin: isAdmin,
    disabled: disabled,
  });

  console.log("Added User: " + email + " to Users");
}

module.exports = router;

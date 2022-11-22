const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");


router.get('/', (request, response) => {
    response.send("hi from tracks")
})


tracks = async (req, res) => {
    const tracksRef = db.collection('Tracks');
    try{
        tracksRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            console.log(data);
            return res.status(201).json(data);
        })
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
};

module.exports = router;
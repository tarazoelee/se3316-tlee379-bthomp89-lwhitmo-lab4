const { db } = require("../../util/admin");

//load the playlists in from firebase
exports.playlists = async (req, res) => {
    const playlistRef = db.collection('Playlists');
    try{
        playlistRef.get().then((snapshot) => {
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
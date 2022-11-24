const { db } = require("../../util/admin");

exports.tracks = async (req, res) => {
    const tracksRef = db.collection('Tracks');
    try{
        tracksRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            return res.status(201).json(data);
        })
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
};
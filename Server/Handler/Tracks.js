const { db } = require("../../util/admin");


exports.tracks = async (req, res) => {
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

/*
exports.tracks = async (req, res) => {
    const tracksRef = db.collection('Tracks');
    const snapshot = await tracksRef.get();
    const data = snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });
    return res.status(201).json(data);
};

exports.tracks = async (req, res) => {
    const tracksRef = db.collection('Tracks');
    const snapshot = await tracksRef.get();
    const data = snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });
};
*/
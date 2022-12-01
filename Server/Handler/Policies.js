const { db } = require("../../util/admin");

//load the playlists in from firebase
exports.policies = async (req, res) => {
    const policyRef = db.collection('Resources');
    try{
        policyRef.get().then((snapshot) => {
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
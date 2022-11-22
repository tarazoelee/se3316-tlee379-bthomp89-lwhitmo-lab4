var admin = require("firebase-admin");

var serviceAccount = require("../lab4-4c879-firebase-adminsdk-6123k-3c66fbf02e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { admin, db };
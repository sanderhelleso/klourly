const dotenv = require('dotenv');
dotenv.load();

const firebase = require('firebase');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

// CONNECT TO STORAGE
const serviceAccount = require("../keys/firebaseServiceAccountKey.json");
const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFilename: serviceAccount
});

// FIREBASE STORAGE
const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET_KEY);
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1024 // no larger than 1mb
    }
});

module.exports = app => {

    // get updated settings data from client
    app.post('/api/settings', (req, res) => {
        console.log(req.body);
    });
}
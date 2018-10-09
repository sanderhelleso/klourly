const dotenv = require('dotenv');
dotenv.load();

const firebase = require('firebase');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const admin = require('firebase-admin');

// CONNECT TO STORAGE
const serviceAccount = require("../keys/firebaseServiceAccountKey.json");
const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFilename: './keys/firebaseServiceAccountKey.json'
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

    // get updated settings data from client and attempt to upload
    app.post('/api/settings', multer.single('file'), (req, res) => {

        // avatar file
        const file = req.file;
        const name = file.originalname;

        // storage bucket
        const storageLocation = `avatars/${name}`;
        const bucketFile = bucket.file(storageLocation);
        bucketFile.save(new Buffer(file.buffer))
        .then(() => {
            res.status(200).json({
                status: 'success',
                data: Object.assign({}, bucketFile.metadata, {
                    avatarUrl: `https://storage.googleapis.com/${bucket.name}/${storageLocation}`,
                })
            })
        })

        // catch any error and send status
        .catch(error => {
            res.status(500).json({
                status: 'error',
                errors: error
            });
        });
    });
}
const firebase = require('firebase');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const admin = require('firebase-admin');
const db = admin.database();

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
    app.post('/api/upload/photo', multer.single('file'), (req, res) => {

        // avatar file
        const file = req.file;
        const name = file.originalname;

        // storage bucket
        const type = name.split('.')[0]; // avatar / cover
        const uid = name.split('.')[1];

        // set storage location depending on type of photo upload
        let storageLocation; // always png
        if (type === 'avatar') {
            storageLocation = `avatars/${uid}.png`;
        }

        else if (type === 'roomCover') {
            storageLocation = `rooms/${uid}/cover.png`;
        }

        else {
            res.status(500).json({
                status: 'error',
                error: 'Invalid file type'
            });
        }
        
        const bucketFile = bucket.file(storageLocation);

        let url;
        bucketFile.save(new Buffer(file.buffer))
        bucketFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })

        // get url of created file bucket
        // update photo data
        .then(signedUrls => {
            photoUrl = signedUrls[0];
            updatePhotoURL(uid, photoUrl, type);
        })

        // send succes data to client
        .then(() => {
            res.status(200).json({
                'success': true,
                photoUrl: url
            });
        })

        // catch any error and send status
        .catch(error => {
            res.status(500).json({
                'success': false,
                error: error
            });
        });
    });
}

// update and set the new photo
function updatePhotoURL(uid, url, type) {

    let ref; // db ref to update
    let key; // key to set to match state key

    if (type === 'avatar') {
        ref = db.ref(`users/${uid}/settings`);
        key = 'photoUrl';
    }

    else if (type === 'roomCover') {
        ref = db.ref(`rooms/${uid}`);
        key = 'cover';
    }

    // update photo ref
    ref.update({
        [key]: url
    })
    .catch(error => {
        throw error;
    });
}
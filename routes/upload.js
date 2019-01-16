const authenticate = require('../middelwares/requireLogin');
const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const admin = require('firebase-admin');
const db = admin.database();

// CONNECT TO STORAGE
const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFilename: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
});

// FIREBASE STORAGE
const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET_KEY);
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }// no larger than 2mb
});


module.exports = app => {

    // get updated settings data from client and attempt to upload
    const upload = multer.single('file');
    app.post('/api/upload/photo', authenticate, async (req, res) => {
        upload(req, res, function (error) {
            if (error) {
                res.status(413).json({
                    error: req.error,
                    success: false,
                    message: 'Image is to large! You can upload an image up to 2mb for your avatar',
                });
                return;
            }
        });

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
                success: false,
                message: 'Invalid file type'
            });
        }
        
        // save file in storage
        const bucketFile = bucket.file(storageLocation);
        bucketFile.save(new Buffer(file.buffer))
        const signedURL = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });

        // get url of created file bucket
        // update photo data
        const updatedImg = await updatePhotoURL(uid, signedURL[0], type);

        res.status(200).json({
            'success': true,
            message: 'Successfully uploaded image',
            photoUrl: updatedImg
        });
    });
}

// update and set the new photo
async function updatePhotoURL(uid, url, type) {

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
    });

    return url;
}
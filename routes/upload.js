const authenticate = require('../middelwares/requireLogin');
const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const admin = require('firebase-admin');
const db = admin.database();
const shortid = require('shortid');

// CONNECT TO STORAGE
const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFilename: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
});

// FIREBASE STORAGE
const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET_KEY);
const multer = Multer({ storage: Multer.memoryStorage() });


module.exports = app => {

    // upload user avatar
    app.post('/api/upload/userAvatar', authenticate, multer.single('file'), async (req, res) => {

        // validate file type
        if (req.file.originalname.split('.')[0] !== 'avatar') {
            res.status(400).json({ success: false, message: 'Malformed payload' });
            return;
        }

        // fileblob and location
        const file = req.file;
        const id = file.originalname.split('.')[1];
        const ref = db.ref(`users/${id}/settings/photoUrl`);
        const storageLocation = `avatars/${id}.png`;

        // re-size to 150x150 for profile picture
        const scaledImg = await sharp(file.buffer).resize(150, 150).toBuffer();

        // save file in storage
        const bucketFile = bucket.file(storageLocation);
        bucketFile.save(new Buffer(scaledImg));
        const signedURL = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });
    
        // update photo ref
        ref.set(signedURL[0]);

        // send back response with url and id
        res.status(200).json({
            success: true,
            message: 'Successfully uploaded image',
            photoUrl: signedURL[0]
        });
    });

    // upload room covers
    app.post('/api/upload/roomCovers', authenticate, multer.single('file'), async (req, res) => {

        // fileblob and location
        const file = req.file;
        const name = file.originalname;

        // storage bucket location
        let storageLocation;

        // db ref prps
        let id;
        let ref;
        let key;
        let scaledImg;
        const type = name.split('.')[0]; // avatar / cover

        // set storage location depending on type of photo upload
        if (type === 'avatar') {
            id = name.split('.')[1];
            ref = db.ref(`users/${id}/settings`);
            key = 'photoUrl';
            storageLocation = `avatars/${id}.png`;

            // re-size to 150x150 for profile picture
            scaledImg = await sharp(file.buffer).resize(150, 150).toBuffer();
        }

        else if (type === 'roomCover') {
            id = shortid.generate();
            ref = db.ref(`rooms/${id}`);
            key = 'cover';
            storageLocationLarge = `rooms/${id}/coverLarge.png`;
            storageLocationSmall = `rooms/${id}/coverSmall.png`;

            // re-size to 1280x300 for cover picture and 300x175 for preview
            scaledImg = {};
            scaledImg.large = await sharp(file.buffer).resize(1024, 450).toBuffer();
            scaledImg.small = await sharp(file.buffer).resize(300, 175).toBuffer();
        }

        else {
            res.status(400).json({
                success: false,
                message: 'Malformed payload'
            });
            return;
        }
        
        // save file in storage
        const bucketFile = await bucket.file(storageLocation);
        await bucketFile.save(new Buffer(scaledImg));
        const signedURL = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });
    
        // update photo ref
        ref.update({ [key]: signedURL[0] });

        // send back response with url and id
        res.status(200).json({
            success: true,
            message: 'Successfully uploaded image',
            photoUrl: signedURL[0],
            id
        });
    });

    app.post('/api/upload/removeAvatar', (req, res) => { 
        
        // delete avatar from storage
        bucket.file(`avatars/${req.body.uid}.png`).delete();
        
        // set original photoURL for user
        const avatarRef = db.ref(`users/${req.body.uid}/settings/photoUrl`);
        avatarRef.set(process.env.DEFAULT_AVATAR);

        // send response back to client with default avatar
        res.status(200).json({
            success: true,
            message: 'Successfully removed avatar',
            defaultAvatar: process.env.DEFAULT_AVATAR
        });
    });
}
const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const admin = require('firebase-admin');
const db = admin.database();
const shortid = require('shortid');

// storage connection
const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFilename: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
});

// storeage and multer config
const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET_KEY);
const multer = Multer({ storage: Multer.memoryStorage() });

const authenticate = require('../middelwares/requireAuth');
const needsVerifiedAcc = require('../middelwares/requireVerifiedAcc');

module.exports = app => {

    // upload user avatar
    app.post('/api/upload/userAvatar', multer.single('file'),
    authenticate, needsVerifiedAcc, async (req, res) => {

        // validate file type
        if (req.file.originalname.split('.')[0] !== 'avatar') {
            return res.status(400).json({ success: false, message: 'Malformed payload' });
        }

        // fileblob and location
        const file = req.file;
        const id = file.originalname.split('.')[1];
        const ref = db.ref(`users/${id}/settings/photoUrl`);
        const storageLocation = `avatars/${id}.png`;

        // re-size to 150x150 for profile picture
        const scaledImg = await sharp(file.buffer).resize(150, 150).toBuffer();

        // save file in storage
        const bucketFile = await bucket.file(storageLocation);
        await bucketFile.save(new Buffer(scaledImg));
        const signedURL = await bucketFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });
    
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
    app.post('/api/upload/roomCovers', multer.single('file'),
    authenticate, needsVerifiedAcc, async (req, res) => {

        // validate file type
        if (req.file.originalname.split('.')[0] !== 'roomCover') {
            return res.status(400).json({ success: false, message: 'Malformed payload' });
        }

        // fileblob and location
        const file = req.file;
        const id = shortid.generate();
        const ref = db.ref(`rooms/${id}`);

        // bucket locations and files
        const coverData = {
            large: {
                file: await sharp(file.buffer).resize(1024, 450).toBuffer(),
                storageLocation: `rooms/${id}/coverLarge.png`
            },
            medium: {
                file: await sharp(file.buffer).resize(480, 175).toBuffer(),
                storageLocation: `rooms/${id}/coverMedium.png`
            },
            small: {
                file: await sharp(file.buffer).resize(100, 100).toBuffer(),
                storageLocation: `rooms/${id}/coverSmall.png`
            }
        };

        const covers = {}; // new cover to store urls
        Object.entries(coverData).forEach(async ([size, cover]) => {

            // save file in storage
            const bucketFile = await bucket.file(cover.storageLocation);
            await bucketFile.save(new Buffer(cover.file));
            const signedUrl = await bucketFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });

            // add file to covers object
            covers[size] = signedUrl[0];

            // once all covers has been set, send back response
            if (Object.keys(covers).length === Object.keys(coverData).length) {

                // update covers ref
                ref.update({ cover: covers });

                // send back response with url and id
                res.status(200).json({
                    success: true,
                    message: 'Successfully uploaded covers',
                    covers,
                    id
                });
            }
        });
    });

    app.post('/api/upload/removeAvatar', authenticate, needsVerifiedAcc, (req, res) => { 
        
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
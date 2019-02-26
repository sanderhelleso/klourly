const firebase = require('firebase-admin');
const db = firebase.database();

const authenticate = require('../middelwares/requireAuth');
const needsVerifiedAcc = require('../middelwares/requireVerifiedAcc');

module.exports = app => {

    // settings
    app.post('/api/updateSettings', authenticate, needsVerifiedAcc, (req, res) => {

        // get user reference in database
        const settingsRef = db.ref(`users/${req.body.uid}/settings`);

        // update settings
        settingsRef.update(req.body.updatedSettings);

        // send response back to user
        res.status(200).json({
            success: true,
            message: 'Successfully updated settings'
        });
    });
}
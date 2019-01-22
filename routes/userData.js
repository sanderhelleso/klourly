const firebase = require('firebase-admin');
const db = firebase.database();

const authenticate = require('../middelwares/requireAuth');

module.exports = app => {

    // get user data from client
    app.post('/api/userData', authenticate, (req, res) => {

        // get user reference in database
        const ref = db.ref(`users/${req.body.uid}`);

        // retrieve data and send to client
        ref.once('value', snapshot => {
            res.status(200).json({
                success: true,
                userData: snapshot.val()
            });
        }); // add catch?
    });

    // settings
    app.post('/api/updateSettings', authenticate, (req, res) => {

        // get user reference in database
        const userRef = db.ref(`users/${req.body.uid}`);

        // update settings
        userRef.once('value', snapshot => {
            userRef.update({
                settings: {
                    ...snapshot.val(),
                    ...req.body.updatedSettings
                }
            });
            
            // send response back to user
            res.status(200).json({
                success: true,
                message: 'Successfully updated settings'
            });
        });
    });
}
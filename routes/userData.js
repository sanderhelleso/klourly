const firebase = require('firebase-admin');
const db = firebase.database();

const authenticate = require('../middelwares/requireLogin');

module.exports = app => {

    // get user data from client
    app.post('/api/userData', authenticate, (req, res) => {

        // get user reference in database
        const ref = db.ref(`users/${req.body.uid}`);

        // retrieve data and send to client
        ref.once('value', snapshot => {
            console.log(snapshot.val());
            res.status(200).json({
                status: 'success',
                userData: snapshot.val()
            });
        }); // add catch?
    });

    // settings
    app.post('/api/updateSettings', authenticate, (req, res) => {

        // get user reference in database
        const userRef = db.ref(`users/${req.body.uid}`);
        delete req.body.uid; // remove uid from body data

        // update settings data in database
        userRef.update({
            settings: req.body
        })
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'Successfully updated settings'
            });
        });
    });
}
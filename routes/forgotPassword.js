// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const ref = db.ref("users");
const email = require('../lib/email');
const shortid = require('shortid');
const jwt = require('../lib/token');
const authenticated = require('../middelwares/requireAuth');

module.exports = app => {

    // send a forgot password email
    app.post('/api/auth/sendForgotPasswordEmail', (req, res) => {

        // send back success response
        res.status(200).json({
            success: true,
            message: 'An e-mail containing instruction on how to reset your password has been sent to the provided email!'
        });
    });
}
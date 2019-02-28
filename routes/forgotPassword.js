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

        // check if email exists
        firebase.auth().getUserByEmail(req.body.email)
        .then(user => {

            // generate id
            const resetID = shortid.generate();

            // update user ref releated to provided email
            ref.child(`${user.uid}/forgotPasswordCode`).set({ resetID });

            // send email to user
            email.sendforgotPassword(req.body.email, resetID, user.uid);
        })
        .catch(err => { console.log(err) }); // catch any error, however we dont notify user

        // send back success response
        // send back same response even if no email exists in system due to securtiy
        res.status(200).json({
            success: true,
            message: 'An e-mail containing instruction on how to reset your password has been sent to the provided email!'
        });
    });
}
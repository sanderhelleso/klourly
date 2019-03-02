// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const ref = db.ref("users");
const email = require('../lib/email');
const shortid = require('shortid');

module.exports = app => {

    // send a forgot password email
    app.post('/api/auth/sendForgotPasswordEmail', (req, res) => {

        // check if email exists
        firebase.auth().getUserByEmail(req.body.email)
        .then(user => {

            // generate id
            const resetPasswordID = shortid.generate();

            // update user ref releated to provided email
            ref.child(user.uid).update({ resetPasswordID });

            // send email to user
            email.sendforgotPassword(req.body.email, resetPasswordID, user.uid);
        })
        .catch(err => {}); // catch any error, however we dont notify user

        // send back success response
        // send back same response even if no email exists in system due to securtiy
        res.status(200).json({
            success: true,
            message: 'An e-mail containing instruction on how to reset your password has been sent to the provided email!'
        });
    });

    // reset password for a specific user
    app.post('/api/auth/resetPassword', (req, res) => {

        // get user ref
        const resetRef = ref.child(`${req.body.userID}/resetPasswordID`);
        resetRef.once('value', snapshot => {
            if (!snapshot.exists() || snapshot.val() !== req.body.resetID) {

                // invalid code or user
                return res.status(400).json({
                    success: false,
                    message: 'The verification code is removed or might never existed.'
                });  
            };

            if (req.body.validate) {

                // validation successfull
                return res.status(200).json({
                    success: true,
                    message: 'validation successfull.'
                });  
            }

            else {

                // delete ref
                resetRef.remove();

                // reset password for the connected user
                firebase.auth().updateUser(req.body.userID, {
                    password: req.body.password
                })
                .then(() => {

                    // send back success response
                    res.status(200).json({
                        success: true,
                        message: 'Your password has successfully been reset. You can now login to your account with the new password!'
                    });
                })
                .catch(error => {

                    // send back potensial error response
                    res.status(400).json({
                        success: false,
                        message: 'We were unable to reset the password to the connected account. Please try again',
                        error
                    });  
                });
            }
        });
    });
}
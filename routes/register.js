// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const ref = db.ref("users");
const email = require('../lib/email');
const shortid = require('shortid');
const jwt = require('../lib/token');
const authenticated = require('../middelwares/requireAuth');

module.exports = app => {

    // get register data from client
    app.post('/api/auth/register', (req, res) => {

        // create new user
        firebase.auth().createUser({
            email: req.body.email,
            disabled: false,
            password: req.body.password,
        })

        // store user data and send verification email
        .then(async userRecord => {

            // get signup date and create verification url
            const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

            // create encrypted email validation
            const verificationID = shortid.generate();

            // set the user UID reference for the contents of user.
            const userRef = ref.child(userRecord.uid);
            const userData = {
                signupDate,
                verificationID,
                settings: {
                    displayName: req.body.displayName,
                    phoneNr: '',
                    occupation: '',
                    status: `Joined Klourly on ${signupDate}`,
                    photoUrl: process.env.DEFAULT_AVATAR,
                    newsLetter: false
                }
            };
            
            // set the content for the user
            userRef.set(userData);

            // remove verification id from datablob sent to client
            delete userData.verificationID;

            // send verification email
            email.sendVerification(req.body.email, verificationID, userRecord.uid);

            // create JWT
            const token = await jwt.sign(userRecord.uid);
                    
            // validate token
            if (!token) {

                // if JWT sign error, notify user
                return res.status(400).json({
                    success: false,
                    message: 'Account was successfully created, but we were unable to log you in at the moment'
                });
            }

            // send data back to client and login user with localstorage using UID
            res.status(200).json({
                userData,
                user: { email: req.body.email, id: userRecord.uid, token, verified: false },
                message: 'Successfully created new user',
                success: true
            });
        })
        
        // catch potensal error that can occur during sign up
        .catch(error => {
            res.json({
                message: error.message,
                success: false
            });
        });
    });

    // validate and verify user account
    app.post('/api/auth/verifyAccount', (req, res) => {

        // check if id and verify code is present
        const verifyRef = db.ref(`users/${req.body.userID}/verificationID`);
        verifyRef.once('value', snapshot => {

            // check if code exists or is not valid
            if (!snapshot.exists() || snapshot.val() !== req.body.verificationID) {
                return res.status(400).json({
                    success: false,
                    message: 'The verification code is removed or might never existed.'
                });
            }

            // verify account and remove verify ref to no longer exist
            firebase.auth().updateUser(req.body.userID, { emailVerified: true });
            verifyRef.remove();

            // send back success response
            res.status(200).json({
                success: true,
                message: 'Thanks! Your account was successfully verified.'
            });
        });
    });

    // resend a verification email to user
    app.post('/api/auth/resendVerificationEmail', authenticated, (req, res) => {

        // get verification ref
        const verifyRef = db.ref(`users/${req.body.uid}/verificationID`);

        // generate new id and update
        const newVerificationID = shortid.generate();
        verifyRef.set(newVerificationID);

        // send new id link to provided email
        email.sendVerification(req.body.email, newVerificationID, req.body.uid);

        // send back success response
        res.status(200).json({
            success: true,
            message: 'E-mail sendt! Click the link in the mail to proceed. Cant see it? Try checking spam folder'
        });
    });
}
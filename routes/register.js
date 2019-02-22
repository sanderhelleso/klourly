// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const ref = db.ref("users");
const email = require('../lib/email');
const verificationID = require('shortid').generate();
const jwt = require('../lib/token');

module.exports = app => {

    // get register data from client
    app.post('/api/auth/register', (req, res) => {
        

        // create new user
        firebase.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            disabled: false,
            password: req.body.password,
        })

        // store user data and send verification email
        .then(async userRecord => {

            // get signup date and create verification url
            const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

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
            userRef.set(userData);

            // send verification email
            email.sendVerification(req.body.email, userRecord.uid, verificationID);

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
                user: { email: req.body.email, id: userRecord.id, token },
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
}
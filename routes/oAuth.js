const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const admin = require('firebase-admin');
const db = admin.database();
const jwt = require('jsonwebtoken');

module.exports = (app, passport) => {

    // handle initial google auth flow
    app.get('/api/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    // handle google auth callback flow
    app.get('/api/auth/google/handleCB',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res) => {

            console.log(req.user);

            // check if user already exists in system
            admin.auth().getUserByEmail(req.user.profile.emails[0].value)
            .then(user => { 

                // User already exists
                console.log('USER IS IN SYSTEM!!')
            })
            .catch(err => { 
                if (err.code === 'auth/user-not-found') {
                    console.log('USER IS NOT IN SYSTEM!!')
                    // User doesn't exist yet, create it...
                }
            });

            res.status(200).json({
                success: true,
                message: 'HITTED CALLBACK'
            });
        }
    );
}
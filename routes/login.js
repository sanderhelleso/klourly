const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const admin = require('firebase-admin');
const db = admin.database();
const jwt = require('jsonwebtoken');

module.exports = (app, passport) => {

    // get authentication data from client
    app.post('/api/login', (req, res) => {

        firebase.signInWithEmail(req.body.email, req.body.password, 
        (error, userRecord) => {

            // if no error
            if (!error) {

                // create JWT
                jwt.sign({ uid: userRecord.user.id }, process.env.JWT_SECRET, 
                (error, token) => {

                    // validate error
                    if (error) {
                        return res.status(400).json({
                            success: false,
                            message: 'Hmm, this is our mistake. We are unable to log you in at this time',
                            reason: 'Unable to sign JWT',
                            error
                        });
                    }

                    // get users data
                    const ref = db.ref(`users/${userRecord.user.id}`);

                    // retrieve data and send to client
                    ref.once('value', snapshot => {

                        // destructor user data
                        const { email, id, authenticatedWith } = userRecord.user;

                        // send user data to client and login in user
                        res.status(200).json({
                            success: true,
                            message: 'Log In Successful',
                            userData: snapshot.val(),
                            user: { email, id, authenticatedWith, token }
                        });
                    }); 

                });
            } 
            
            else res.json({ success: false });
        });
    });

    app.get('/api/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

    app.get('/api/auth/google/handleCB',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res) => {
            console.log(req.user);
        }
    );
}
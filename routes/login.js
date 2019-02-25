const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const admin = require('firebase-admin');
const db = admin.database();
const jwt = require('../lib/token');

module.exports = app => {

    // get authentication data from client
    app.post('/api/auth/login', (req, res) => {

        firebase.signInWithEmail(req.body.email, req.body.password, 
        async (error, userRecord) => {

            // if no error
            if (!error) {

                // create JWT
                const token = await jwt.sign(userRecord.user.id);
                
                // validate token
                if (!token) {

                    // if JWT sign error, notify user
                    return res.status(400).json({
                        success: false,
                        message: 'Hmm, this is our mistake. We are unable to log you in at this time'
                    });
                }

                // get users data
                const ref = db.ref(`users/${userRecord.user.id}`);

                // retrieve data and send to client
                ref.once('value', snapshot => {

                    // destructor for user data
                    const { email, id, authenticatedWith } = userRecord.user;
                    const userData = snapshot.val();

                    // check if verified
                    const verified = userData.verificationID ? false : true;
                    if (!verified) delete userData.verificationID;

                    // send user data to client and login user
                    res.status(200).json({
                        success: true,
                        message: 'Log In Successful',
                        userData,
                        user: { email, id, authenticatedWith, token, verified }
                    });
                }); 
            } 
            
            // send back invalid login to user
            else res.status(401).json({ 
                success: false,
                message: 'Invalid e-mail or password. Please try again'
            });
        });
    });
}
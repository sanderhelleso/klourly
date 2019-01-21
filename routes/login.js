const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const admin = require('firebase-admin');
const db = admin.database();

module.exports = app => {

    // get authentication data from client
    app.post('/api/login', (req, res) => {

        firebase.signInWithEmail(req.body.email, req.body.password, 
        (error, userRecord) => {

            // if no error
            if (!error) {

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
                        user: { email, id, authenticatedWith, token: userRecord.token }
                    });
                }); 
            } 
            
            else res.json({ success: false });
        });
    });
}
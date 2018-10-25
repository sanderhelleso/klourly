const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);

module.exports = app => {

    // get authentication data from client
    app.post('/api/login', (req, res) => {

        firebase.signInWithEmail(req.body.email, req.body.password, (error, userRecord) => {
            if (error) {
                console.log(error);
                res.json({
                    error: error,
                    success: false
                })
            }
            
            // credentials valid, send response data back to client
            else {
                console.log(userRecord);

                // send data back to client and login user with localstorage using UID
                res.json({
                    userData: userRecord,
                    message: 'Log In Successful',
                    success: true
                });
            }
        });
    });
}
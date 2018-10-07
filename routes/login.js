const dotenv = require('dotenv');
dotenv.load();

const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);

module.exports = app => {

    // get authentication data from client
    app.post('/api/login', (req, res) => {

        firebase.signInWithEmail(req.body.email, req.body.password,
            function(err, result) {
            if (err)
                console.log(err);
            else
                console.log(result);
        });
    });
}
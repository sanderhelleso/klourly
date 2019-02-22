// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const ref = db.ref("users");

module.exports = app => {

    // get register data from client
    app.post('/api/auth/register', (req, res) => {
        

        // attempt to create new user
        firebase.auth().createUser({
            email: req.body.email.toLowerCase(),
            emailVerified: false,
            disabled: false,
            password: req.body.password,
        })
        .then(userRecord => {

            // set the user UID reference for the contents of user.
            const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const userRef = ref.child(userRecord.uid);
            userRef.set({
                signupDate: signupDate,
                settings: {
                    displayName: req.body.displayName,
                    phoneNr: '',
                    occupation: '',
                    status: `Joined Klourly on ${signupDate}`,
                    photoUrl: process.env.DEFAULT_AVATAR,
                    newsLetter: false
                }
            });

            // send data back to client and login user with localstorage using UID
            res.status(200).json({
                userData: userRecord,
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
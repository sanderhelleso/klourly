const firebase = require('firebase-admin');
const db = firebase.database();
const signupRef = db.ref("users");

module.exports = app => {

    // get signup data from client
    app.post('/api/signup', (req, res) => {

        // attempt to create new user
        firebase.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            password: req.body.password,
            displayName: `${req.body.firstName} ${req.body.lastName}`,
            disabled: false
        })
        // create new user
        .then(function(userRecord) {

            // set the user UID reference for the contents of user.
            console.log("Successfully created new user:", userRecord.uid);
            const usersRef = signupRef.child(userRecord.uid);
            const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            usersRef.set({
                signupDate: signupDate,
                newsletter: false,
                settings: {
                    displayName: `${req.body.firstName} ${req.body.lastName}`,
                    phoneNr: '',
                    occupation: '',
                    status: `Joined Klourly on ${signupDate}`,
                    photoUrl: ''
                }
            });

            // send data back to client and login user with localstorage using UID
            console.log(userRecord);
            res.json({
                userData: userRecord,
                message: 'Successfully created new user',
                success: true
            });
        })
        // if error, catch and send error to user
        .catch(function(error) {
            console.log("Error creating new user:", error);
            res.json(error);
        });
    });
}
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

            // See the user UID reference for the contents of user.
            console.log("Successfully created new user:", userRecord.uid);
            const usersRef = signupRef.child(userRecord.uid);
            usersRef.set({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                signupDate: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                newsletter: false
            });

            // here we send data back to client and login user with localstorage using UID
            //////////////////////////////////////////////////////////////////////
        })
        // if error, catch and send error to user
        .catch(function(error) {
            console.log("Error creating new user:", error);
            res.json(error);
        });
    });
}
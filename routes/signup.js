// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const signupRef = db.ref("users");

module.exports = app => {

    // get signup data from client
    app.post('/api/signup', (req, res) => {
        

        // attempt to create new user
        firebase.auth().createUser({
            email: req.body.email.toLowerCase(),
            emailVerified: false,
            disabled: false,
            password: req.body.password,
        })

        // once user is created, generate custom token
        .then(userRecord => {

            // set the user UID reference for the contents of user.
            const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const usersRef = signupRef.child(userRecord.uid);
            usersRef.set({
                address: req.body.location,
                signupDate: signupDate,
                settings: {
                    displayName: `${capitalize(req.body.firstName)} ${capitalize(req.body.lastName)}`,
                    phoneNr: '',
                    occupation: '',
                    status: `Joined Klourly on ${signupDate}`,
                    photoUrl: process.env.DEFAULT_AVATAR,
                    newsLetter: req.body.newsLetter
                }
            });

            // send data back to client and login user with localstorage using UID
            res.json({
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

// capitalize given string
function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
}
// firebase setup
const firebase = require('firebase-admin');
const db = firebase.database();
const signupRef = db.ref("users");

module.exports = app => {

    // get signup data from client
    app.post('/api/signup', (req, res) => {

        // attempt to create new user
        const name = `${capitalize(req.body.firstName)} ${capitalize(req.body.lastName)}`
        firebase.auth().createUser({
            email: req.body.email.toLowerCase(),
            emailVerified: false,
            password: req.body.password,
            displayName: name,
            disabled: false
        })
        // create new user
        .then(function(userRecord) {

            // minified URL of default avatar
            const DEFAULT_AVATAR = 'https://tinyurl.com/ybqewu28';

            // set the user UID reference for the contents of user.
            const usersRef = signupRef.child(userRecord.uid);
            const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            usersRef.set({
                signupDate: signupDate,
                newsletter: false,
                settings: {
                    displayName: name,
                    phoneNr: '',
                    occupation: '',
                    status: `Joined Klourly on ${signupDate}`,
                    photoUrl: DEFAULT_AVATAR
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
        .catch(error => {
            console.log("Error creating new user:", error);
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
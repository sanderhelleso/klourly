const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get authentication data from client
    app.post('/api/authenticated', (req, res) => {

        // attempt to authenticate user
        firebase.auth().getUser(req.body.uid)
        .then((userRecord) => {

            res.json({
                message: 'Authentication Successful',
                success: true
            })
        })
        .catch((error) => {
            console.log("Error fetching user data:", error);
            res.json({
                message: 'Authentication Failed',
                success: false
            })
        });
    });
}
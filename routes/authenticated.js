const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get authentication data from client
    app.post('/api/authenticated', (req, res) => {

        // attempt to authenticate user
        firebase.auth().getUser(req.body.uid)
        .then((userRecord) => {

            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully fetched user data:", userRecord.toJSON());
            res.json({
                message: 'Authentication Successful',
                success: true
            })
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
            res.json({
                message: 'Authentication Failed',
                success: false
            })
        });
    });
}
const firebase = require('firebase-admin');
const db = firebase.database();
const signupRef = db.ref("users");

module.exports = app => {

    // get user data from client
    app.post('/api/userData', (req, res) => {

        // get user reference in database
        const ref = db.ref(`users/${req.body.uid}`);

        // retrieve data and send to client
        ref.once('value', snapshot => {
            console.log(snapshot.val());
            res.status(200).json({
                status: 'success',
                userData: snapshot.val()
            });
        }); // add catch?
    });
}
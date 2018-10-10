const firebase = require('firebase-admin');
const db = firebase.database();
const signupRef = db.ref("users");

module.exports = app => {

    // get user data from client
    app.post('/api/userData', (req, res) => {
        console.log(req.body.uid);
        const ref = db.ref(`users/${req.body.uid}`);
        ref.once('value', snapshot => {
            console.log(snapshot.val());
        })
    });
}
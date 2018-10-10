const firebase = require('firebase-admin');
const db = firebase.database();
const signupRef = db.ref("users");

module.exports = app => {

    // get user data from client
    app.post('/api/userData', (req, res) => {
        console.log(123);
    });
}
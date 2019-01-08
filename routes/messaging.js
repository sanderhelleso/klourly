const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // set a messaging token for a user
    app.post('/api/messaging/setToken', (req, res) => {
        console.log(req.body);
    });
}
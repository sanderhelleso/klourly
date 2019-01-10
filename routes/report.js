const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    app.post('/api/report/getRoomReport', (req, res) => {
        console.log(req.body);
    });
}

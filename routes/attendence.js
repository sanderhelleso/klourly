const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get attendence registration data
    app.post('/api/registerAttendence', async (req, res) => {

        console.log(req.body);
    });

}
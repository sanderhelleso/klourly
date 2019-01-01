const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get attendence registration data
    app.post('/api/registerAttendence', async (req, res) => {

        console.log(req.body);

        // get checkin path
        const path = 'rooms/' + req.body.roomID +
                        '/checkin/' + req.body.attendenceData.key + 
                            '/days/' + req.body.attendenceData.day +
                                '/' + new Date().getFullYear() +
                                    '/' + req.body.attendenceData.week +
                                        '/' + req.body.uid;
        
        // get checkin ref for user
        const checkinRef = db.ref(path);

        // set attendence
        checkinRef.set(req.body.attendenceData.timeOfRegister);
    });

}
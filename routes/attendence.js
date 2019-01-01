const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get attendence registration data
    app.post('/api/registerAttendence', async (req, res) => {

        // get checkin path
        const path = 'rooms/' + req.body.roomID +
                        '/checkin/' + req.body.attendenceData.key + 
                            '/days/' + req.body.attendenceData.day +
                                '/' + new Date().getFullYear() +
                                    '/' + req.body.attendenceData.week +
                                        '/' + req.body.uid;
        
        // get checkin ref for user
        const checkinRef = db.ref(path);

        // if validate is set to true, validate to check if user has already checked in
        if (req.body.validate) {
            checkinRef.once('value', snapshot => {
                res.status(200).json({ success: snapshot.val() ? true : false });
            });
        }

        // if not set attendence
        else {

            // set attendence
            checkinRef.set(req.body.attendenceData.timeOfRegister);

            // send back response with success message
            res.status(200).json({ 
                success: true,
                message: 'Attendence was successfully registered'
            });
        }
    });

    // get attendence for a specific user for a room
    app.post('/api/getAttendence', async (req, res) => {
        
        
        console.log(req.body);
    });
    

}
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
        
        
        // get checkin path
        const checkinRef = db.ref(`rooms/${req.body.roomID}/checkin`);
        checkinRef.once('value', snapshot => {

            let stats = { attended: false }; // default to false

            // check if checkin is registered for given room
            if (snapshot.val()) {

                // update status and get attendence data
                stats = getAttendenceStats(snapshot.val(), req.body.uid);
                stats.attended = true;
            }

            // send back response with retrieved data
            res.status(200).json({ 
                success: true,
                stats
            });

        });
    });
}

function getAttendenceStats(data, uid) {

    const attendenceStats = {
        total: 0,
        userAttended: 0,
        attendedInPercent: 100
    }

    // itterate over each time 
    data.map(time => {

        // itteratoe over each days registered year
        Object.values(time.days).forEach(year => {

            // itterate over each years registered week
            Object.values(year).forEach(week => {

                // increment the total room attendence possible
                attendenceStats.total += Object.keys(week).length;

                // if user has checked in to time
                Object.values(week).forEach(attendie => {

                    // increment users count if present
                    if (attendie.hasOwnProperty(uid)) { attendenceStats.userAttended += 1 };
                });
            });
        });
    });

    // set total attendence in percentage
    attendenceStats.attendedInPercent = Math.floor((attendenceStats.userAttended / attendenceStats.total) * 100);

    return attendenceStats;
}
const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get attendence registration data
    app.post('/api/registerAttendence', (req, res) => {

        const checkinTimestamp = new Date().getTime();
        
        // get checkin ref for user
        const roomRef = db.ref(`rooms/${req.body.roomID}`);
        roomRef.once('value', snapshot => {

            // retrieve user ref and set the checkin data
            const checkinID = snapshot.val().checkin.checkinID;
            const userCheckinRef = db.ref(`users/${req.body.uid}/checkins/${req.body.roomID}/${checkinID}`);
            userCheckinRef.set(checkinTimestamp);

            // update the rooms checkin ref
            roomRef.child(`checkins/${checkinID}/attendies/${req.body.uid}`).set(checkinTimestamp);
        });

        // send back response with success message
        res.status(200).json({ 
            success: true,
            message: 'Attendence was successfully registered'
        });
        
    });

    // get attendence for a specific user for a room
    app.post('/api/getAttendence', (req, res) => {
        
        // get room reference
        const roomCheckinsRef = db.ref(`rooms/${req.body.roomID}/checkins`);
        roomCheckinsRef.once('value', roomCheckinSnapshot => {

            // get total room checkins
            console.log(roomCheckinSnapshot.val())
            const totalRoomCheckins = Object.keys(roomCheckinSnapshot.val()).length;

            // get user reference
            const userCheckinRef = db.ref(`users/${req.body.uid}/checkins/${req.body.roomID}`);
            userCheckinRef.once('value', userCheckinsnapshot => {

                // get total user checkins for room
                console.log(userCheckinsnapshot.val())
                const totalUserCheckinsForRoom = Object.keys(userCheckinsnapshot.val()).length;

                // send back response with success message and data
                res.status(200).json({ 
                    success: true,
                    message: 'Attendence was successfully retrieved',
                    attendenceData: {
                        attendenceInPercentage: Math.round((totalUserCheckinsForRoom / totalRoomCheckins) * 100),
                        totalRoomCheckins,
                        totalUserCheckinsForRoom
                    }
                });
            });
        });
        
    });
}
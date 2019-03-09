const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');
const authenticate = require('../middelwares/requireAuth');

module.exports = app => {

    // register for room member
    app.post('/api/attendance/registerAttendence', authenticate, (req, res) => {

        const checkinTimestamp = new Date().getTime();
        
        // get checkin ref for user
        const roomRef = db.ref(`rooms/${req.body.roomID}`);
        roomRef.once('value', snapshot => {

            // retrieve user ref and set the checkin data
            const checkinID = snapshot.val().checkin.checkinID;
            const userCheckinRef = db.ref(`users/${req.body.uid}/checkins/${req.body.roomID}/${checkinID}`);
            userCheckinRef.set(checkinTimestamp);

            // update the rooms checkin ref
            roomRef.child(`checkins/${checkinID}/attendies/${req.body.uid}`)
            .set(checkinTimestamp);
        });

        // send back response with success message
        res.status(200).json({ 
            success: true,
            message: 'Attendence was successfully registered'
        });
    });

    // validate checkin link
    app.post('/api/attendance/validateRegisterCode', (req, res) => {

        // get rooms checkin ref
        const checkinRef = db.ref(`rooms/${req.body.roomID}/checkin`);
        checkinRef.once('value', snapshot => {

            // validate ref
            if (!validateCheckinRef(snapshot, req.body.checkinID)) {
                return invalidCheckinRef(res);
            }

            // send back response with success message
            res.status(200).json({ 
                success: true,
                message: 'Registration code is valid'
            });
        });
    });

    // register for non-user by type 'code'
    app.post('/api/attendance/registerAttendenceWithCode', (req, res) => {

        // get rooms checkin ref
        const checkinRef = db.ref(`rooms/${req.body.roomID}/checkin`);
        checkinRef.once('value', snapshot => {

            // validate ref
            if (!validateCheckinRef(snapshot, req.body.checkinID)) {
                return invalidCheckinRef(res);
            }

            // timestamp of checkin & name from request
            const checkinData = {
                checkinTimestamp: new Date().getTime(),
                name: req.body.name
            }

            // get checkin ref for user & update the rooms current checkin ref
            const checkinsRef = db.ref(`rooms/${req.body.roomID}/checkins/${req.body.checkinID}`);
            checkinsRef.child(`attendies/${shortid.generate()}`)
            .set(checkinData);

            // send back response with success message
            res.status(200).json({ 
                success: true,
                message: 'Attendence was successfully registered'
            });

        });
    });

    // get attendence for a specific user for a room
    app.post('/api/attendance/getAttendence', authenticate, (req, res) => {
        
        // get room reference
        const roomCheckinsRef = db.ref(`rooms/${req.body.roomID}/checkins`);
        roomCheckinsRef.once('value', roomCheckinSnapshot => {

            // get total room checkins
            const totalRoomCheckins = roomCheckinSnapshot.val() 
                ? Object.keys(roomCheckinSnapshot.val()).length : 0;

            // get user reference
            const userCheckinRef = db.ref(`users/${req.body.uid}/checkins/${req.body.roomID}`);
            userCheckinRef.once('value', userCheckinsnapshot => {

                // get total user checkins for room
                const totalUserCheckinsForRoom = userCheckinsnapshot.val()
                    ? Object.keys(userCheckinsnapshot.val()).length : 0

                // send back response with success message and data
                res.status(200).json({ 
                    success: true,
                    message: 'Attendence was successfully retrieved',
                    attendenceData: {
                        totalRoomCheckins,
                        totalUserCheckinsForRoom
                    }
                });
            });
        });
    });
}

// validateCheckinRef validates the given ref
// and check if its present, and id matches
function validateCheckinRef(snapshot, checkinID) {

    // validate ref
    if (!snapshot.exists() ||
        snapshot.val().type !== 'code' ||
        snapshot.val().checkinID !== checkinID) {
        return false;
    }

    return true;
}

// send back invalid checkin response
function invalidCheckinRef(res) {

    // send back error response
    res.status(404).json({ 
        success: false,
        message: 'The registration has expired or might never existed.'
    });
}
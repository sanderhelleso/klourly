const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');

const authenticate = require('../middelwares/requireLogin');

module.exports = app => {

    // create new room
    app.post('/api/createRoom', authenticate, (req, res) => {
        const roomData = JSON.parse(req.body.room);

        // create room refrence connected to user
        const id = shortid.generate();
        const userRef = db.ref(`users/${req.body.uid}/rooms/owning/${id}`);
        
        // set room id for refrence path
        userRef.set({ name: roomData.name });

        // create room
        const roomRef = db.ref(`rooms/${id}`)
        roomData.id = id; // set id to room
        roomData.invite =  { ...generateInvitationLink(2, id) }; // create invitation link (1 week)
        roomData.members = req.body.uid; // add owner to memberlist

        // after setting new room data, get all user rooms and send to client
        roomRef.set({ ...roomData })
        .then(() => {
            const roomsRef = db.ref(`users/${req.body.uid}/rooms`);
            roomsRef.orderByChild('name').once('value', snapshot => {
                res.status(200).json({
                    success: true,
                    message: 'Successfully created room',
                    id: id,
                    rooms: snapshot.val()
                });
            }); 
        });
    });

    // get data for a specific room
    app.post('/api/getRoom', authenticate, (req, res) => {

        // get ref to room by id and fetch data
        const roomRef = db.ref(`rooms/${req.body.roomID}`)
        roomRef.once('value', roomSnapshot => {

            // get ref to owner by id recieved from room data and fetch owner data 
            const ownerRef = db.ref(`users/${roomSnapshot.val().owner}/settings`);
            ownerRef.once('value', ownerSnapshot => {

                // once all data are retrieved, send to client and update state
                res.status(200).json({
                    success: true,
                    message: 'Successfully fetched room',
                    roomData: roomSnapshot.val(),
                    ownerData: {
                        name: ownerSnapshot.val().displayName,
                        photoUrl: ownerSnapshot.val().photoUrl
                    }
                });
            });
        }); 
    });

    // get data for an collection of rooms
    app.post('/api/getRooms', authenticate, (req, res) => {

        // array to store rooms
        const rooms = [];

        // itterate over rooms and get data
        Object.keys(req.body.rooms).forEach((roomID) => {
            const roomRef = db.ref(`rooms/${roomID}`);
            roomRef.orderByChild('name').once('value', snapshot => {
                
                // push room data to array
                rooms.push(snapshot.val());

                // once all rooms have been stored in array, send to client
                if (rooms.length === Object.keys(req.body.rooms).length) {
                    res.status(200).json({
                        success: true,
                        message: 'Successfully fetched rooms',
                        roomsData: rooms,
                    });
                }
            });
        });
    });

    // publish a new room announcement
    app.post('/api/publishAnnouncement', authenticate, async (req, res) => {

        // get room announcement
        const roomRef = db.ref(`rooms/${req.body.roomID}/announcements/${shortid.generate()}`);
        
        // set room announcement
        const setAnnouncement = await roomRef.set({
            ...req.body.announcement,
            timestamp: new Date().getTime(),
            author: req.body.uid
        });

        console.log(setAnnouncement);

        res.status(200).json({
            success: true,
            message: 'Successfully published announcement'
        });

    });
}

const HOUR = 3600000; // ms for an hour
function generateInvitationLink(duration, id) {

    switch (duration) {

        // one day
        case 0:
            duration = HOUR * 24;
            break;

        // 3 days
        case 1:
           duration = HOUR * 72;
           break;

        // 1 week (default)
        case 2:
            duration = HOUR * 168;
            break;
    }

    const timeStamp = new Date().getTime();
    const invite = {
        validFrom: timeStamp,
        validTo: timeStamp + duration,
        url: `/join-room/${timeStamp}/${id}`
    }

    return invite;
}
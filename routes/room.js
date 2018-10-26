const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');

module.exports = app => {

    // create new room
    app.post('/api/createRoom', (req, res) => {
        const roomData = JSON.parse(req.body.room);

        // create room refrence connected to user
        const id = shortid.generate();
        const userRef = db.ref(`users/${req.body.uid}/rooms/owning/${id}`);
        
        // set room id for refrence path
        userRef.set({ name: roomData.name });

        // create room
        const roomRef = db.ref(`rooms/${id}`)
        roomData.id = id;
        roomRef.set({ ...roomData })
        
        // after setting new room data, get all user rooms and send to client
        .then(() => {
            const roomsRef = db.ref(`users/${req.body.uid}/rooms`);
            roomsRef.once('value', snapshot => {
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully created room',
                    id: id,
                    rooms: snapshot.val()
                });
            }); 
        });
    });

    // get data for a specific room
    app.post('/api/getRoom', (req, res) => {

        // get ref to room by id and fetch data
        const roomRef = db.ref(`rooms/${req.body.roomID}`)
        roomRef.once('value', roomSnapshot => {

            // get ref to owner by id recieved from room data and fetch owner data 
            const ownerRef = db.ref(`users/${roomSnapshot.val().owner}/settings`);
            ownerRef.once('value', ownerSnapshot => {

                // once all data are retrieved, send to client and update state
                res.status(200).json({
                    status: 'success',
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
    app.post('/api/getRooms', (req, res) => {

        // array to store rooms
        const rooms = [];

        // itterate over rooms and get data
        Object.keys(req.body.rooms).forEach((roomID) => {
            db.ref(`rooms/${roomID}`).once('value', snapshot => {
                
                // push room data to array
                rooms.push(snapshot.val());

                // once all rooms have been stored in array, send to client
                if (rooms.length === Object.keys(req.body.rooms).length) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Successfully fetched rooms',
                        roomsData: rooms,
                    });
                }
            });
        });
    });
}
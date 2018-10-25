const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');

module.exports = app => {

    app.post('/api/createRoom', (req, res) => {
        const roomData = JSON.parse(req.body.room);

        // create room refrence connected to user
        const id = shortid.generate();
        roomData.id = id;
        const roomRef = db.ref(`users/${req.body.uid}/rooms/owning/${id}/`);

        // set roomdata for refrence path
        roomRef.set({
            ...roomData
        })

        // after setting new room data, get all user rooms and send to client
        .then(() => {
            const roomsRef = db.ref(`users/${req.body.uid}/rooms`);
            roomsRef.once('value', snapshot => {
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully created room',
                    newRoom: roomData,
                    rooms: snapshot.val()
                });
            }); 
        });
    });
}
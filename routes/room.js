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

    app.post('/api/getRoom', (req, res) => {

        const userRef = db.ref(`users/${req.body.uid}/settings`);
        const roomRef = db.ref(`rooms/${req.body.roomID}`)
        roomRef.once('value', roomSnapshot => {
            userRef.once('value', userSnapshot => {
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully fetched room',
                    room: roomSnapshot.val(),
                    user: {
                        name: userSnapshot.val().displayName,
                        photoUrl: userSnapshot.val().photoUrl
                    }
                });
            });
        }); 
    });
}
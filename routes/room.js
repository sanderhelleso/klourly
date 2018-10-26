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
        const roomRef = roomData.type === 'Private' ? db.ref(`rooms/private/${id}`) : db.ref(`rooms/public/${id}`)
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
        console.log(req.body);
    });
}
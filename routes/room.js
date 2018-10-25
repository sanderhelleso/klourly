const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');

module.exports = app => {

    app.post('/api/createRoom', (req, res) => {
        const roomData = JSON.parse(req.body.room);
        console.log(roomData);
        console.log('ID: ' + req.body.uid);

        // create room refrence connected to user
        const id = shortid.generate();
        roomData.id = id;
        const roomRef = db.ref(`users/${req.body.uid}/rooms/owning/${id}/`);

        // set roomdata for refrence path
        roomRef.set({
            ...roomData
        })
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'Successfully created room',
                room: roomData
            });
        });
    });
}
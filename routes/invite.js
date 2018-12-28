const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');


module.exports = app => {

    // get invitations room data
    app.post('/api/getRoomInvite', async (req, res) => {

        // get ref to room by id
        const roomInviteRef = db.ref(`rooms/${req.body.roomID}/invite`);

        // check if current invite link is valid AND active
        await roomInviteRef.once('value', snapshot => {
            console.log(snapshot.val());
        });

    });

}
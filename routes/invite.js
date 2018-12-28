const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');


module.exports = app => {

    // get invitations room data
    app.post('/api/getRoomInvite', async (req, res) => {

        // get ref to room by id
        const roomRef = db.ref(`rooms/${req.body.roomID}`);

        let status = 200;
        let response = {};

        // check if current invite link is valid AND active
        await roomRef.once('value', snapshot => {
            //console.log(snapshot.val().invite);

            // check if room exists
            if (snapshot.val() === null || snapshot.val().invite.inviteID !== req.body.inviteID) {
                status = 404; // not found
                response = {
                    success: false,
                    message: 'The invitation is removed or might never existed.'
                }
            }

            // check if invite ID is valid and active
            else if (snapshot.val().invite.validTo < new Date().getTime()) {
                status = 410; // expired
                response = {
                    success: false,
                    message: 'The invitation is no longer active. Please contact the owner of the room for a new invitation.'
                }
            }

            // if user is logged in, check if user is already a member of room
            else if (req.body.uid && snapshot.val().members.indexOf(req.body.uid) !== -1) {
                status = 409; // conflict
                response = {
                    success: false,
                    message: 'User is already a member of this room'
                }
            }

        });

        // send back response
        res.status(status).json(response);

    });

}
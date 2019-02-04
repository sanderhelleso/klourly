const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get invitations room data
    app.post('/api/getRoomInvite', async (req, res) => {

        // get ref to room by id
        const roomRef = db.ref(`rooms/${req.body.roomID}`);
        let ownerRef = {};

        // default values
        let status = 404;
        let response = { 
            redirectActionSuccess: true,
            mode: 'NEW_ROOM_INVITE'
        };

        // check if current invite link is valid AND active
        await roomRef.once('value', async snapshot => {

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
            else if (req.body.uid && snapshot.val().members && snapshot.val().members.indexOf(req.body.uid) !== -1) {
                status = 409; // conflict
                response = {
                    success: false,
                    message: 'No need for another invite! Looks like you are already a member of this room'
                }
            }

            // invitation to room is valid and user is eligable to join
            // however another request is neccesary if not logged in for further validation
            else {

                ownerRef = await db.ref(`users/${snapshot.val().owner}/settings`);
                status = 200; // OK

                // check for present callback
                if (req.body.cb === 'joinRoom') {

                    // pass along room preview data
                    response.invitedRoomID = snapshot.val().id

                    // add user to room
                    await roomRef.update({
                        members: snapshot.val().members 
                        ? [...snapshot.val().members, req.body.uid]
                        : [req.body.uid]
                    });

                    // add room to user
                    const userAttendingRoomsRef = await db.ref(`users/${req.body.uid}/rooms/attending`);
                    await userAttendingRoomsRef.once('value', async roomSnapshot => {
                        await userAttendingRoomsRef.set(
                            roomSnapshot.val() 
                            ? [...roomSnapshot.val(), req.body.roomID]
                            : [req.body.roomID]
                        );
                    });
                }

                // if not, set required data
                else {
                    response = {
                        success: true,
                        redirectActionSucess: false,
                        invitationData: {
                            name: snapshot.val().name,
                            cover: snapshot.val().cover.large,
                        }
                    }
                }
            }
        });

        // fetch owner data
        if (status === 200 && !req.body.cb) {

            // get ref to owner by id recieved from room data and fetch owner data 
            await ownerRef.once('value', ownerSnapshot => {

                // set owner data
                response.invitationData.ownerData = {
                    name: ownerSnapshot.val().displayName,
                    photoUrl: ownerSnapshot.val().photoUrl
                }

                // set response message
                response.message = `${ownerSnapshot.val().displayName} has invited you to join this room. Click the button below to proceed and gain access to the room.`;
            });
        }

        // send back response containing owner and room data
        res.status(status).json(response);
    });

}
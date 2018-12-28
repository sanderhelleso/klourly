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
        roomData.invite =  { ...generateInvitationLink(id) }; // create invitation link (1 week)
        roomData.members = [req.body.uid]; // add owner to memberlist

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
            author: req.body.uid,
            reactions: {
                happy: {
                    emoji: '😄',
                    count: 0,
                },
                love: {
                    emoji: '😍',
                    count: 0,
                },
                upset: {
                    emoji: '😓',
                    count: 0,
                },
                shocked: {
                    emoji: '😨',
                    count: 0,
                },
                wow: {
                    emoji: '😲',
                    count: 0,
                }
            }
        });

        // send back response
        res.status(200).json({
            success: true,
            message: 'Successfully published announcement'
        });

    });

    // update announcement reaction
    app.post('/api/updateAnnouncementReaction', authenticate, async (req, res) => {

        // get annoucement ref
        const announcementRef = db.ref(`rooms/${req.body.roomID}/announcements/${req.body.announcementID}/reactions/${req.body.reactionName}`);

        // get the value and proceed to updte counter
        await announcementRef.once('value', async snapshot => {

            // if first reaction, add user and update counter
            if (snapshot.val().reacted === undefined) {
                await announcementRef.update({
                    reacted: [req.body.uid],
                    count: snapshot.val().count += 1
                });
            }

            // if reaction is already present, check if user has reacted before
            else {

                // not reacted, increase
                if (snapshot.val().reacted.indexOf(req.body.uid) === -1) {
                    await announcementRef.update({
                        reacted: [...snapshot.val().reacted, req.body.uid],
                        count: snapshot.val().count += 1
                    });
                }

                // reacted, decrease
                else {
                    await announcementRef.update({
                        reacted: snapshot.val().reacted.slice(1, snapshot.val().reacted.indexOf(req.body.id)),
                        count: snapshot.val().count -= 1
                    });
                }
            }
        });

        // send back response containing updated reaction
        announcementRef.once('value', snapshot => {
            res.status(200).json({
                success: true,
                message: 'Successfully reacted to announcement',
                updated: snapshot.val()
            });
        });
    });

    // get data for an collection of rooms
    app.post('/api/updateRoomInvite', authenticate, async (req, res) => {

        // get ref to room by id
        const roomInviteRef = db.ref(`rooms/${req.body.roomID}/invite`);

        // generate a new invitation link
        const newInvitation =  generateInvitationLink(req.body.roomID);
        await roomInviteRef.update({
            ...newInvitation
        });

        // send back response with updated invitation link
        res.status(200).json({
            success: true,
            message: 'Successfully updated room invite link',
            newInvitation
        });
    });
}


function generateInvitationLink(roomID) {

    const hour =    3600000;    // 1 hour (60 min)
    const weeks =   168;        // 1 week (7 days)

    const inviteID = shortid.generate();
    const timeStamp = new Date().getTime();

    const invite = {
        validFrom: timeStamp,
        validTo: timeStamp + (hour * weeks),
        url: `/join-room/${inviteID}/${roomID}`,
        inviteID,
        roomID
    }

    return invite;
}
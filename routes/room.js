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
                        photoUrl: ownerSnapshot.val().photoUrl,
                        id: roomSnapshot.val().owner
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
        req.body.rooms.forEach(roomID => {
            const roomRef = db.ref(`rooms/${roomID}`);
            roomRef.once('value', snapshot => {
                
                // get needed preview data
                const roomPreview = {
                    id: snapshot.val().id,
                    cover: snapshot.val().cover,
                    name: snapshot.val().name,
                    times: snapshot.val().times
                }

                // push room preview data to array
                rooms.push(roomPreview);

                // once all rooms have been stored in array, send to client
                if (rooms.length === req.body.rooms.length) {
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
                        reacted: snapshot.val().reacted.filter(uid => uid !== req.body.uid),
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

    // get data for an collection of a rooms members
    app.post('/api/getRoomMembers', authenticate, (req, res) => {

        // array to store members
        const membersList = [];

        // get members ref of each user
        req.body.membersList.forEach(async member => {
            
            // exclude admin
            if (member !== req.body.uid) {

                // get ref for each user in passed in list
                const userRef = db.ref(`users/${member}`);

                // fetch email
                const memberRes = await firebase.auth().getUser(member);

                // retieve releated user data
                await userRef.once('value', snapshot => {
                    membersList.push({
                        id: member,
                        name: snapshot.val().settings.displayName,
                        photoUrl: snapshot.val().settings.photoUrl,
                        occupation: snapshot.val().settings.occupation,
                        phoneNr: snapshot.val().settings.phoneNr,
                        email: memberRes.email
                    });
                });

                // check if all members data has been collected
                if (membersList.length === req.body.membersList.length - 1) {

                    // send back response with updated invitation link
                    res.status(200).json({
                        success: true,
                        message: 'Successfully recieved members data',
                        membersList
                    });
                }
            }
        });
    });

    // remove a specific member from a room
    app.post('/api/removeRoomMember', authenticate, async (req, res) => {

        // get ref to rooms members by id
        const roomMembersRef = db.ref(`rooms/${req.body.roomID}/members`);

        // delete member from list
        await roomMembersRef.once('value', async snapshot => {

            // update list and remove user
            const updatedMembersList = snapshot.val().filter(uid => uid !== req.body.uid);

            await roomMembersRef.set(updatedMembersList);

            // send back response with updated members list
            res.status(200).json({
                success: true,
                message: 'Successfully deleted member from room',
                updatedMembersList
            });
        });
    });

    // activate room for checkin
    app.post('/api/activateRoom', authenticate, (req, res) => {

        // get ref to rooms members by id
        const roomRef = db.ref(`rooms/${req.body.roomID}`);

        // generate checkin ID and timestamp
        const checkinID = shortid.generate();
        const timestamp = new Date().getTime();

        // update checkin data
        roomRef.update({
            checkin: {
                timestamp,
                checkinID,
                active: true,
                coords: req.body.checkinData
            },
        });

        // set checkin ref for members
        roomRef.child('checkins').update({
            [checkinID]: {
                startTime: timestamp,
                attendies: {}
            }
        });

        // send back response with success message and checkin data
        res.status(200).json({
            success: true,
            message: 'Successfully activated room for checkin',
            checkinData: {
                timestamp,
                checkinID
            }
        });
    });

    // deactivate room for checkin
    app.post('/api/deactivateRoom', authenticate, (req, res) => {

        // get ref to rooms members by id
        const roomRef = db.ref(`rooms/${req.body.roomID}`);

        // update checkin data
        roomRef.update({ checkin: { active: false } });

        // set endtime of deactivated checkin time
        roomRef.child(`checkins/${req.body.checkinID}`).update({ endTime: new Date().getTime() });

        // send back response with success message and checkin data
        res.status(200).json({
            success: true,
            message: 'Successfully deactivated room for checkin'
        });
    });

    // fetch users active rooms
    app.post('/api/getActiveRooms', authenticate, (req, res) => {

        // get ref to users owned 
        const owningRef = db.ref(`users/${req.body.uid}/rooms/owning`);
        owningRef.once('value', owningSnapshot => {
            
            let counter = 0;                                // itteration counter
            const activeCheckins = {};                      // result set
            const userOwnedRooms = owningSnapshot.val();    // owned room list

            // if list is empty send back response and return immediatly
            if (!userOwnedRooms) {

                // send back response with success message and checkin data
                res.status(200).json({
                    success: true,
                    message: 'Successfully fetched active rooms',
                    activeCheckins
                });

                return;
            }

            // itterate over list and create set containing currently active rooms 
            userOwnedRooms.forEach(roomID => {

                // get ref to room and access snapshot data
                const roomRef = db.ref(`rooms/${roomID}`);
                roomRef.once('value', roomSnapshot => {

                    // increment counter
                    counter++;

                    // check if room is active, if active add to list of active rooms
                    const roomData = roomSnapshot.val();
                    if (roomData.checkin.active) {
                       activeCheckins[roomData.checkin.checkinID] = {
                           ...roomData.checkins[roomData.checkin.checkinID],
                           roomID
                       };
                    }

                    // check if counter is equal to list length
                    // if all data is collected, send back response with data
                    if (userOwnedRooms.length === counter) {

                        // send back response with success message and checkin data
                        res.status(200).json({
                            success: true,
                            message: 'Successfully fetched active rooms',
                            activeCheckins
                        });
                    }
                });
           });
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
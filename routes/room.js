const firebase = require('firebase-admin');
const db = firebase.database();
const shortid = require('shortid');
const authenticate = require('../middelwares/requireAuth');

module.exports = app => {

    // create new room
    app.post('/api/createRoom', authenticate, (req, res) => {

        // create data obj and cleanup props
        const roomData = req.body.roomData;
        delete roomData.stage;
        delete roomData.blob;

        // if no room cover, set default and generate roomID
        if (!roomData.cover) {
            roomData.id = shortid.generate();
            roomData.cover = {
                large: process.env.DEFAULT_ROOM_COVER_LARGE,
                small: process.env.DEFAULT_ROOM_COVER_SMALL,
            }
        }
        
        roomData.invite =  generateInvitationLink(roomData.id);
        roomData.members = [];
        roomData.checkin = { active: false };

        // create room refrence connected to user
        const userRef = db.ref(`users/${roomData.owner}`);
        
        // set room id for refrence path
        userRef.child('rooms/owning').once('value', snapshot => {
            userRef.child('rooms/owning').set(
                snapshot.exists()
                ? [...snapshot.val(), roomData.id] 
                : [roomData.id]
            );
        });

        // update database with new room
        const roomRef = db.ref(`rooms/${roomData.id}`);
        roomRef.set(roomData);

        // get ref to owner by id recieved from room data and fetch owner data 
        userRef.child('settings').once('value', ownerSnapshot => {

            // set owner data to room data
            roomData.owner = {
                name: ownerSnapshot.val().displayName,
                photoUrl: ownerSnapshot.val().photoUrl,
                id: roomData.owner
            }

            // send back response with roomData for client sync
            res.status(200).json({
                success: true,
                message: 'Successfully created room',
                roomData
            });
        });
    });

    // get data for a specific room
    app.post('/api/getRoom', authenticate, (req, res) => {

        // get ref to room by id and fetch data
        const roomRef = db.ref(`rooms/${req.body.roomID}`)
        roomRef.once('value', roomSnapshot => {

            // check if room exists
            if (!roomSnapshot.exists()) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid roomID, could not find room'
                });
            }

            // get ref to owner by id recieved from room data and fetch owner data 
            const ownerRef = db.ref(`users/${roomSnapshot.val().owner}/settings`);
            ownerRef.once('value', ownerSnapshot => {

                // once all data are retrieved, send to client and update state
                res.status(200).json({
                    success: true,
                    message: 'Successfully fetched room',
                    roomData: {
                        ...roomSnapshot.val(),
                        announcements: false // retrieve on client for listener and limit
                    },
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
                    cover: snapshot.val().cover.small,
                    name: snapshot.val().name,
                    type: snapshot.val().type
                }

                // push room preview data to array
                rooms.push(roomPreview);

                // once all rooms have been stored in array, send to client
                if (rooms.length === req.body.rooms.length) {
                    res.status(200).json({
                        success: true,
                        message: 'Successfully fetched rooms',
                        roomsData: rooms
                    });
                }
            });
        });
    });

    // publish a new room announcement
    app.post('/api/publishAnnouncement', authenticate, (req, res) => {

        // get room announcement
        const announcementID = shortid.generate();
        const roomRef = db.ref(`rooms/${req.body.roomID}`);

        const announcement = {
            ...req.body.announcement,
            timestamp: new Date().getTime(),
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
        };
        
        // set room announcement
        roomRef.child(`/announcements/${announcementID}`).set(announcement);

        // send back response
        res.status(200).json({
            success: true,
            message: 'Successfully published announcement',
            announcementID,
            announcement,
        });
    });

    // update announcement reaction
    app.post('/api/updateAnnouncementReaction', authenticate, (req, res) => {

        // get annoucement ref
        const announcementRef = db.ref(`rooms/${req.body.roomID}/announcements/${req.body.announcementID}/reactions/${req.body.reactionName}`);

        // get the value and proceed to updte counter
        announcementRef.once('value', snapshot => {

            // if first reaction, add user and update counter
            if (snapshot.val().reacted === undefined) {
                announcementRef.update({
                    reacted: [req.body.uid],
                    count: snapshot.val().count += 1
                });
            }

            // if reaction is already present, check if user has reacted before
            else {

                // not reacted, increase
                if (snapshot.val().reacted.indexOf(req.body.uid) === -1) {
                    announcementRef.update({
                        reacted: [...snapshot.val().reacted, req.body.uid],
                        count: snapshot.val().count += 1
                    });
                }

                // reacted, decrease
                else {
                    announcementRef.update({
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

    // vote and update an announcements poll
    app.post('/api/announcement/voteAnnouncementPoll', authenticate, (req, res) => {

        // get annoucement ref
        const pollRef = db.ref(`rooms/${req.body.roomID}/announcements/${req.body.announcementID}/poll`);

        // get the value and proceed to updte counter
        pollRef.once('value', snapshot => {

            const voteOptions = { voted: req.body.voteOption, timestamp: new Date().getTime() };
            const voted = snapshot.val().voted 
            ? {
                ...snapshot.val().voted,
                [req.body.uid]: voteOptions
            }
            : { [req.body.uid]: voteOptions };

            pollRef.update({ voted });

            pollRef.child(`/options/${req.body.voteOption}`).update({
                votes: snapshot.val().options[req.body.voteOption].votes + 1,
            });

            // send back response with updated invitation link
            res.status(200).json({
                success: true,
                message: 'Thanks! Your vote has been registered',
                voted
            });
        });
    });

    // post an comment releated to a rooms announcement
    app.post('/api/announcement/postAnnouncementComment', authenticate, (req, res) => {

        // get annoucement ref
        const commentsRef = db.ref(`rooms/${req.body.roomID}/announcements/${req.body.announcementID}/comments`);

        // get the value and proceed to update comments
        commentsRef.once('value', snapshot => {

            // add new comment to comments ref
            commentsRef.push(req.body.commentData);

            // send back response with status
            res.status(200).json({
                success: true,
                message: 'Comment successfully posted',
                commentators: snapshot.exists() ? [...new Set(Object.values(snapshot.val())
                                .filter(comment => comment.author.userID !== req.body.uid)
                                .map(comment => comment.author.userID))] : []
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
            
            // get ref for each user in passed in list
            const userRef = db.ref(`users/${member}`);

            // fetch email
            const memberRes = await firebase.auth().getUser(member);

            // retieve releated user data
            await userRef.once('value', snapshot => {

                // if report  is true, get checkins
                if (req.body.report) {
                    membersList.push({
                        id: member,
                        name: snapshot.val().settings.displayName,
                        photoUrl: snapshot.val().settings.photoUrl,
                        checkins: snapshot.val().checkins 
                                  ? snapshot.val().checkins[req.body.roomID] 
                                  : null
                    });
                }

                // if preview is true, only retrieve needed data
                else if (req.body.getOnlyPreview) {
                    membersList.push({
                        id: member,
                        name: snapshot.val().settings.displayName,
                        photoUrl: snapshot.val().settings.photoUrl
                    });
                }

                else {
                    membersList.push({
                        id: member,
                        name: snapshot.val().settings.displayName,
                        photoUrl: snapshot.val().settings.photoUrl,
                        occupation: snapshot.val().settings.occupation,
                        phoneNr: snapshot.val().settings.phoneNr,
                        email: memberRes.email
                    });
                }
            });

            // check if all members data has been collected
            if (membersList.length === req.body.membersList.length) {

                // send back response with updated invitation link
                res.status(200).json({
                    success: true,
                    message: 'Successfully recieved members data',
                    membersList
                });
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

        roomRef.once('value', snapshot => {

            // send back response with success message and checkin data
            res.status(200).json({
                success: true,
                message: 'Successfully activated room for checkin',
                checkinData: {
                    timestamp,
                    checkinID,
                    membersList: snapshot.val().members ? snapshot.val().members : [],
                    totalMembers: snapshot.val().members ? snapshot.val().members.length : 0
                }
            });
        });
    });

    // deactivate room for checkin
    app.post('/api/deactivateRoom', authenticate, (req, res) => {

        // get ref to rooms members by id and checkins re
        const roomRef = db.ref(`rooms/${req.body.roomID}`);

        // update checkin data
        roomRef.update({ checkin: { active: false } });

        // set endtime of deactivated checkin time
        roomRef.once('value', snapshot => {
            const checkinSnap = snapshot.val().checkins[req.body.checkinID];

            // values to calculate the average attendence for the room
            const totalCheckins = checkinSnap.attendies ? Object.keys(checkinSnap.attendies).length : 0;
            const totalMembers = snapshot.val().members ? snapshot.val().members.length : 0;
            
            roomRef.child(`checkins/${req.body.checkinID}`)
            .update({ 
                endTime: new Date().getTime(),
                attendenceInPercent: Math.round((totalCheckins / totalMembers) * 100)
            });
        });

        // send back response with success message and checkin data
        res.status(200).json({
            success: true,
            message: 'Successfully deactivated room for checkin'
        });
    });

    // fetch users active rooms
    app.post('/api/getActiveRooms', authenticate, (req, res) => {

        // get ref to users rooms
        const userRef = db.ref(`users/${req.body.uid}`);
        userRef.once('value', userSnapshot => {
            
            let counter = 0;                                         
            const activeCheckins = {};           
            const usersCheckedinRooms = userSnapshot.val().checkins;
            
            // validate user rooms
            let userOwnedRooms = userSnapshot.val().rooms;
            if (userOwnedRooms) userOwnedRooms = userOwnedRooms.owning;

            // if list is empty send back response and return immediatly
            if (!userOwnedRooms) {

                // send back response with success message and checkin data
                res.status(200).json({
                    activeCheckins,
                    success: true,
                    message: 'Successfully fetched active rooms',
                    empty: true,
                    usersCheckedinRooms: usersCheckedinRooms 
                                         ? usersCheckedinRooms 
                                         : {}
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
                    if (roomData.checkin.active && roomData.checkins) {
                       activeCheckins[roomData.checkin.checkinID] = {
                            ...roomData.checkins[roomData.checkin.checkinID],
                            roomID,
                            membersList: roomData.members,
                            totalMembers: roomData.members.length
                       };
                    }

                    // check if counter is equal to list length
                    // if all data is collected, send back response with data
                    if (userOwnedRooms.length === counter) {

                        // send back response with success message and checkin data
                        res.status(200).json({
                            activeCheckins,
                            success: true,
                            message: 'Successfully fetched active rooms',
                            empty: false,
                            usersCheckedinRooms: usersCheckedinRooms 
                                                 ? usersCheckedinRooms 
                                                 : {}
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

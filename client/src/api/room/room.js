import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const room = {
    createRoom,
    uploadRoomCovers,
    getLocationFromCoords,
    getRoom,
    getRooms,
    publishAnnouncement,
    updateAnnouncementReaction,
    voteAnnouncementPoll,
    updateRoomInvite,
    getRoomMembers,
    removeRoomMember,
    activateRoom,
    deactivateRoom,
    getActiveRooms,
    postAnnouncementComment
}

// create new room
async function createRoom(uid, roomData) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/createRoom',
            data: {
                uid,
                roomData
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
} 

// upload room covers for a room
async function uploadRoomCovers(data) {
     try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/upload/roomCovers',
            data
        });

        // return data recieved from server
        return response;
    }

    catch(error) {
        return error.response;
    }
} 

// get room location from coords
async function getLocationFromCoords(uid, coords) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/createRoom/getLocationFromCoords',
            data: {
                uid,
                coords
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
} 


// get room data for a specific room
async function getRoom(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getRoom',
            data: {
                uid,
                roomID
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
} 

// get room data for an array of rooms
async function getRooms(uid, rooms) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getRooms',
            data: {
                uid,
                rooms
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// add a new announcement to coresponding room
async function publishAnnouncement(uid, roomID, announcement) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/publishAnnouncement',
            data: {
                uid,
                roomID,
                announcement
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// update an announcements reaction
async function updateAnnouncementReaction(uid, roomID, announcementID, reactionName) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/updateAnnouncementReaction',
            data: {
                uid,
                roomID,
                announcementID,
                reactionName
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// vote for an announcements poll
async function voteAnnouncementPoll(uid, roomID, announcementID, voteOption) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/announcement/voteAnnouncementPoll',
            data: {
                uid,
                roomID,
                announcementID,
                voteOption
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// update an rooms invitation link
async function updateRoomInvite(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/updateRoomInvite',
            data: {
                uid,
                roomID
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// retrieve data about a rooms members
async function getRoomMembers(uid, roomID, membersList, getOnlyPreview, report) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getRoomMembers',
            data: {
                uid,
                roomID,
                membersList,
                getOnlyPreview,
                report
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// remove a specific member from a room
async function removeRoomMember(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/removeRoomMember',
            data: {
                uid,
                roomID
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// activate the given room for checkin
async function activateRoom(uid, roomID, checkinData, radius, type) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/activateRoom',
            data: {
                uid,
                roomID,
                checkinData,
                radius,
                type
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// deactivate the given room for checkin
async function deactivateRoom(uid, roomID, checkinID, type) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/deactivateRoom',
            data: {
                uid,
                roomID,
                checkinID,
                type
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// fetch all users owned room that is active for checking
async function getActiveRooms(uid) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getActiveRooms',
            data: {
                uid
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}

// post an comment releated to a rooms announcement
async function postAnnouncementComment(uid, roomID, announcementID, commentData) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/announcement/postAnnouncementComment',
            data: {
                uid,
                roomID,
                announcementID,
                commentData
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        return error.response;
    }
}


import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const room = {
    createRoom,
    getLocationFromCoords,
    getRoom,
    getRooms,
    publishAnnouncement,
    updateAnnouncementReaction,
    updateRoomInvite,
    getRoomMembers,
    removeRoomMember,
    activateRoom,
    deactivateRoom,
    getActiveRooms
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
async function activateRoom(uid, roomID, checkinData) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/activateRoom',
            data: {
                uid,
                roomID,
                checkinData
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
async function deactivateRoom(uid, roomID, checkinID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/deactivateRoom',
            data: {
                uid,
                roomID,
                checkinID
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


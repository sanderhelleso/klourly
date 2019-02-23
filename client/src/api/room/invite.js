import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const invite = {
    getRoomInvite,
    sendRoomInviteToRecipients
}

// get invited rooms data
async function getRoomInvite(inviteData) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/auth/getRoomInvite',
            data: inviteData
        });

        return response;
    }

    catch(error) {
        return error.response;
    }
}

// get invited rooms data
async function sendRoomInviteToRecipients(uid, roomID, invitationCode, recipients) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/room/sendRoomInviteToRecipients',
            data: {
                uid,
                roomID,
                invitationCode,
                recipients
            }
        });

        return response;
    }

    catch(error) {
        return error.response;
    }
} 
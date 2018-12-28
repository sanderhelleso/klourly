import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const invite = {
    getRoomInvite
}

// get invited rooms data
async function getRoomInvite(inviteData) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/getRoomInvite',
            data: inviteData
        });

        return response;
    }

    catch(error) {
        return error.response;
    }
} 
import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const report = {
    getRoomReports
}

// get a rooms report data
async function getRoomReports(uid, roomID) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/report/getRoomReports',
            data: {
                uid,
                roomID
            }
        });

        return response;
    }

    catch(error) {
        return error.response;
    }
} 
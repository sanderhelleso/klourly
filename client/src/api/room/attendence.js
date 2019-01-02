import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const attendence = {
    registerAttendence,
    getAttendence
}

// register attendence for a user aswell as lookup if already checkedin
async function registerAttendence(validate, uid, roomID, attendenceData) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/registerAttendence',
            data: {
                validate,
                uid,
                roomID,
                attendenceData
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
} 

// retrieve total attendence in percentage for a specific user in a room
async function getAttendence(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getAttendence',
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
import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const attendence = {
    registerAttendence,
    validateRegisterCode,
    registerAttendenceByCode,
    getAttendence
}

// register attendence for a user aswell as lookup if already checkedin
async function registerAttendence(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/attendance/registerAttendence',
            data: {
                uid,
                roomID
            }
        });

        return response;
    }

    catch(error) {
        return error.response;
        console.log(error);
    }
} 

// validare register code at given endpoint
async function validateRegisterCode(roomID, checkinID) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/attendance/validateRegisterCode',
            data: {
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

// register attendence for a user aswell as lookup if already checkedin
async function registerAttendenceByCode(name, roomID, checkinID) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/attendance/registerAttendenceWithCode',
            data: {
                name,
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

// retrieve total attendence in percentage for a specific user in a room
async function getAttendence(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/attendance/getAttendence',
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
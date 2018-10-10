import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const dashboard = {
    avatarUpload,
    fetchUserData
};

// update user avatar
async function avatarUpload(data) {

    // send data to endpoint and attempt to update avatar
    try {
        const response = await axios({
            method: 'post',
            url: '/api/avatarUpload',
            data: data
        });

        // return data recieved from server
        return response;
    }

    catch(error) {
        console.log(error);
    }
}

async function fetchUserData(uid) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/userData',
            data: {
                uid: uid
            }
        });

        // return data recieved from server
        return response;
    }

    catch(error) {
        console.log(error);
    }
} 
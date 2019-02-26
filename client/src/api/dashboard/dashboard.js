import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const dashboard = {
    uploadAvatar,
    updateSettings,
    removeAvatar
};

// update user avatar
async function uploadAvatar(data) {

    // send data to endpoint and attempt to update avatar
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/upload/userAvatar',
            data
        });

        // return data recieved from server
        return response;
    }

    catch(error) {

        return error.response;
    }
}

async function removeAvatar(uid) {

    // send data to endpoint and attempt to remove avatar
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/upload/removeAvatar',
            data: {
                uid
            }
        });

        // return data recieved from server
        console.log(response);
        return response;
    }

    catch(error) {

        return error.response;
        console.log(error);
    }
}

// update settings
async function updateSettings(uid, updatedSettings) {

    // send data to endpoint and attempt to update settings
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/updateSettings',
            data: {
                uid,
                updatedSettings
            }
        });

        // return data recieved from server
        return response;
    }

    catch(error) {
        return error.response;
    }
}
import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const dashboard = {
    uploadPhoto,
    updateSettings,
    fetchUserData,
    removeAvatar
};

// update user avatar
async function uploadPhoto(data) {

    // send data to endpoint and attempt to update avatar
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/upload/photo',
            data: data
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

// fetch user data
async function fetchUserData(uid) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/userData',
            data: {
                uid: uid
            }
        });

        // set userData as localstorage
        localStorage.setItem('userData', JSON.stringify(response.data.userData));            
        return response;
    }

    catch(error) {
        console.log(error);
    }
} 
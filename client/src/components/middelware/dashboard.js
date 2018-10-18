import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const dashboard = {
    avatarUpload,
    updateSettings,
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

// update settings
async function updateSettings(data) {

    // send data to endpoint and attempt to update settings
    try {
        const response = await axios({
            method: 'post',
            url: '/api/updateSettings',
            data: data
        });

        // return data recieved from server
        return response;
    }

    catch(error) {
        console.log(error);
    }
}

// fetch user data
async function fetchUserData(uid) {
    try {
        const response = await axios({
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
import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';
import { redirect } from '../middelware/redirect';

export const dashboard = {
    uploadPhoto,
    updateSettings,
    fetchUserData,
    createRoom,
    getRoom,
    getRooms,
    getMapKey,
    getLocation
};

// update user avatar
async function uploadPhoto(data) {

    // send data to endpoint and attempt to update avatar
    try {
        const response = await axios({
            method: 'post',
            url: '/api/upload/photo',
            data: data
        });

        // return data recieved from server
        console.log(response);
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

// create new room
async function createRoom(uid, data) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/createRoom',
            data: {
                uid: uid,
                room: data
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
            method: 'post',
            url: '/api/getRoom',
            data: {
                uid: uid,
                roomID: roomID
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
        redirect.login();
    }
} 

// get room data for an array of rooms
async function getRooms(uid, rooms) {
    try {
        const response = await axios({
            headers: authHeader,
            method: 'post',
            url: '/api/getRooms',
            data: {
                uid: uid,
                rooms: rooms
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
}

// get map key
async function getMapKey() {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/maps/key',
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
}

function getLocation() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}
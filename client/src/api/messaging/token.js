import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const token = {
    getToken,
    setToken
}

// retrieve a messaging token for a user
async function getToken(uid) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/messaging/getToken',
            data: {
                uid
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
} 

// set a messaging token for a user
async function setToken(uid, token) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/messaging/setToken',
            data: {
                uid,
                token
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
} 

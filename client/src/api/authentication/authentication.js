import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const authentication = {
    register,
    login,
    googleOauth,
    validateUser,
    authAndDoAction,
    verifyAccount
};

async function register(displayName, email, password) {

    // send data to endpoint and attempt to create user
    try {
        const response = await axios({
            method: 'post',
            url: '/api/auth/register',
            data: {
                displayName,
                email,
                password
            }
        });

        return response;
    }

    // catch error
    catch (error) { return error.response };
}

async function login(email, password) {
    
    // send data to endpoint and attempt to login user
    try {
        const response = await axios({
            method: 'post',
            url: '/api/auth/login',
            data: {
                email,
                password
            }
        });

        return response;
    }

    // catch error
    catch (error) { return error.response };
}

async function googleOauth(cb) {

   
    try {
        const response = await axios({
            method: 'get',
            url: `/api/auth/google/handleCB?code=${cb.code}&scope=${cb.profile}`
        });

        return response;
    }

    // catch error
    catch (error) { return error.response };
}

async function validateUser(uid) {

    // send data to endpoint and attempt to authenticate user
    if (!uid) {
        return false;
    }

    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/auth/authenticated',
            data: {
                uid
            }
        });

        // get response from endpoint
        return response.data.success;
    }

    // catch error
    catch (error) { return error.response };
}

// verify user
async function verifyAccount(verificationData) {

    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/auth/verifyAccount',
            data: {
                ...verificationData
            }
        });

        // get response from endpoint
        return response.data.success;
    }

    // catch error
    catch (error) { return error.response };
}

// check for params and run action depending on params
async function authAndDoAction(params, uid) {

    // api endpoint
    let endpoint = '';
    
    // check for callback
    switch (params.cb) {
        case 'joinRoom':
            endpoint = '/api/auth/getRoomInvite';
            break;

        default: return false;
    }

    // run cb action
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: endpoint,
            data: {
                uid,
                ...params
            }
        });

        // get response from endpoint
        return response;
    }

    // catch and return error
    catch (error) {
        return error.response;
    }
}

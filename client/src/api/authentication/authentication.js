import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const authentication = {
    signup,
    login,
    validateUser,
    authAndDoAction
};

async function signup(firstName, lastName, email, password, location, newsLetter) {
    // send data to endpoint and attempt to create user
    try {
        const response = await axios({
            method: 'post',
            url: '/api/signup',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                location: location,
                newsLetter: newsLetter
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
            url: '/api/login',
            data: {
                email: email,
                password: password
            }
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
            url: '/api/authenticated',
            data: {
                uid: uid
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
            endpoint = '/api/getRoomInvite';
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
                uid: uid,
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

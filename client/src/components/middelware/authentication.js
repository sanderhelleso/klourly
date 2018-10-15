import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const authentication = {
    signup,
    login,
    logout,
    validateUser
};

async function signup(firstName, lastName, email, password) {
    // send data to endpoint and attempt to create user
    try {
        const response = await axios({
            method: 'post',
            url: '/api/signup',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        });

        // success, store UID in localstorage and redirect to dashboard
        console.log(response.data);
        if (response.data.success) {            
            return response.data.success;
        }

        // something went wrong (allready user with email etc..)
        else {
            //this.notify('error', response.data.message);
        }
    }

    // catch and display error
    catch (error) {
        console.log(error);
    };
}

async function validateUser(uid) {

    console.log(uid);

    // send data to endpoint and attempt to authenticate user
    if (uid === null || uid === undefined || uid === '') {
        return false;
    }

    try {
        const response = await axios({
            method: 'post',
            url: '/api/authenticated',
            data: {
                uid: uid
            }
        });

        // get response from endpoint
        return response.data.success;
    }

    // catch and display error
    catch (error) {
        console.log(error);
        return false;
    }
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
        
        // get response from endpoint
        // success, store UID in localstorage and redirect to dashboard
        if (response.data.success) {
            console.log(response.data.userData);
            localStorage.setItem('user', JSON.stringify(response.data.userData.user));            
        }

        // something went wrong (allready user with email etc..)
        else {
            //this.notify('error', response.data.message);
        }

        return response.data;
    }

    // catch and display error
    catch (error) {
        console.log(error);
    };
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
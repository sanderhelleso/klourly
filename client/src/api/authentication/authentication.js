import { authHeader } from '../../helpers/authHeader';
import history from '../../helpers/history';
import axios from 'axios';

export const authentication = {
    signup,
    login,
    logout,
    validateUser
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

        return response.data;
    }

    // catch and display error
    catch (error) {
        return error;
    };
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

// remove user from local storage to log user out
function logout() {
    localStorage.clear();
    history.push('/login');
}

async function validateUser(uid) {

    console.log(uid);

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

    // catch and display error
    catch (error) {
        console.log(error);
        return false;
    }
}
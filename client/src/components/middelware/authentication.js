import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const authentication = {
    signup,
    login,
    logout,
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
        // get response from endpoint
        console.log(response);

        // success, store UID in localstorage and redirect to dashboard
        if (response.data.success) {
            localStorage.setItem('user', response.data.userData.uid);
            
            return response.data.userData.uid;
            //signupActions.
            //window.location.replace('/dashboard');
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

async function validateUser() {
    // send data to endpoint and attempt to authenticate user
    const uid = localStorage.getItem('user');
    if (uid === null || uid === undefined || uid === '') {
        return false;
    }

    try {
        const response = await axios({
            method: 'post',
            url: '/api/authenticated',
            data: {
                uid: localStorage.getItem('user')
            }
        });
        // get response from endpoint
        console.log(response);
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
        console.log(response);

        // success, store UID in localstorage and redirect to dashboard
        if (response.data.success) {
            localStorage.setItem('user', response.data.userData.uid);
            
            return response.data.userData.uid;
            //signupActions.
            //window.location.replace('/dashboard');
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

    /*return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });*/
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
import axios from 'axios';

export const authenticate = async () => {
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
import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const dashboard = {
    settings
};

// update settings for user
async function settings(data) {

    // send data to endpoint and attempt to update settings
    try {
        const response = await axios({
            method: 'post',
            url: '/api/settings',
            data: {
                avatar: 'test'
            }
        });
    }

    catch(e) {
        console.log(e);
    }
}
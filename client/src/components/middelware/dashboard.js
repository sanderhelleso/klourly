import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const dashboard = {
    avatarUpload
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
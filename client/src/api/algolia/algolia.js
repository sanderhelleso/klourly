import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const algolia = {
    keys
};

// fetch api key for algolia places
async function keys() {

    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/algolia/keys'
        });

        // return data recieved from server
        console.log(response);
        return response;
    }

    catch(error) {
        console.log(error);
    }
}

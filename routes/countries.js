const axios = require('../client/node_modules/axios');
const request = require('request');


module.exports = app => {

    // get country and state data for signup
    const DATA_URL = 'https://tinyurl.com/yblwzrb3'; // api url
    app.get('/api/signup/countries', (req, res) => {

        // perform request to endpoint
        request({
            url: DATA_URL,
            json: true
        },

        // check for error and get JSON data
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                console.log(body) // Print the json response
            }
        });
    });
}
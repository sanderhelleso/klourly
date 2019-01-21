const firebase = require('firebase-admin');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {

        // split at the space and get token from array
        const bearerToken = bearerHeader.split(' ')[1];            

        jwt.verify(bearerToken, process.env.JWT_SECRET, (error, authData) => {

            if (!error && authData.uid === req.body.uid) next();
            else sendForbidden(res);
        });

    }

    // forbidden
    else sendForbidden(res);
};

function sendForbidden(res) {

    // forbidden, not authorized
    res.status(403).json({ 
        success: false,
        error: 'Not authorized',
        message: 'Not authorized to perform this action. Please login on new and try again' 
    });
}


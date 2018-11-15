const firebase = require('firebase-admin');

module.exports = (req, res, next) => {

    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {

            // split at the space and get token from array
            const bearerToken = bearerHeader.split(' ')[1];

            req.token = bearerToken;

            // go next
            authenticateUser(req.token);
    }

    // forbidden
    else {
        res.sendStatus(403);
    }

    // attempt to authenticate user
    function authenticateUser(uid) {
        firebase.auth().getUser(uid)
        .then(() => {
            next();
        })
        .catch((error) => {
    
            // forbidden, not authorized
            res.status(403).json({ 
                success: false,
                error: 'You are not authorized',
                reason: error.errorInfo.code
            });
        });
    }
};
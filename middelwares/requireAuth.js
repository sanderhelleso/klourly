const firebase = require('firebase-admin');

module.exports = (req, res, next) => {

    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {

            // split at the space and get token from array
            const bearerToken = bearerHeader.split(' ')[1];

            req.token = bearerToken;

            // authenticate and go next
            authenticateUser(req.body.uid, req.token);
    }

    // forbidden
    else sendForbidden(res);

    // attempt to authenticate user
    function authenticateUser(uid, token) {
        firebase.auth().verifyIdToken(token)
        .then(decodedToken => {

            
            // compare decoded uid to given uid
            if (uid === decodedToken.uid) next();

            else sendForbidden(res);

        })
        .catch(() => { sendForbidden(res) });
    }
};

function sendForbidden(res) {

    // forbidden, not authorized
    res.status(403).json({ 
        success: false,
        error: 'Not authorized',
        message: 'Not authorized to perform this action. Please login on new and try again' 
    });
}


const firebase = require('firebase-admin');

module.exports = (req, res, next) => {

    console.log(req.body.uid);
    console.log(req.headers);

    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {

            // split at the space and get token from array

            const bearerToken = bearerHeader.split(' ')[1];

            req.token = bearerToken;

            // go next
            next();
    }

    // forbidden
    else {
        res.sendStatus(403);
    }

    /*// attempt to authenticate user
    firebase.auth().getUser(req.body.uid)
    .then(() => {
        next();
    })
    .catch((error) => {

        // forbidden, not authorized
        res.status(403).json({ 
            success: false,
            error: 'You are not authorized to enter this room',
            reason: error.errorInfo.code
        });
    });*/
};
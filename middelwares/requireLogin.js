const firebase = require('firebase-admin');

module.exports = (req, res, next) => {

    // attempt to authenticate user
    firebase.auth().getUser(req.body.uid)
    .then(() => {
        next();
    })
    .catch((error) => {

        // forbidden, not authorized
        res.status(200).json({ 
            success: false,
            error: 'You are not authorized to enter this room',
            reason: error.errorInfo.code
        });
    });
};
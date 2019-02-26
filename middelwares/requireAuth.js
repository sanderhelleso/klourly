const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is present
    if (bearerHeader) {

        // split at the space and get token from array
        const bearerToken = bearerHeader.split(' ')[1];            

        jwt.verify(bearerToken, process.env.JWT_SECRET, (error, authData) => {

            // if valid, continue
            if (!error && authData.uid === req.body.uid) return next();

            // if not, send forbidden
            sendForbidden(res);
        });

    }

    // no beared, send forbidden
    else sendForbidden(res);
};

// forbidden, not authorized
function sendForbidden(res) {
    res.status(403).json({ 
        success: false,
        error: 'Not authorized',
        message: 'Not authorized to perform this action. Please login on new and try again' 
    });
}


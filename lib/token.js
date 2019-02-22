const jwt = require('jsonwebtoken');

module.exports = token = {
    sign
}

// create signed JWT
async function sign(uid) {
    await jwt.sign({ uid }, process.env.JWT_SECRET, 
    (error, token) => error ? false : token);
}
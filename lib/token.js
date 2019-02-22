const jwt = require('jsonwebtoken');

module.exports = token = {
    sign
}

// create signed JWT
async function sign(uid) {
    return await jwt.sign({ uid }, process.env.JWT_SECRET);
} 
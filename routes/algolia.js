const authenticate = require('../middelwares/requireRoomAuth');

module.exports = app => {

    // create new room
    app.post('/api/algolia/keys', authenticate, (req, res) => {
        res.status(200).json({
            appId: process.env.ALGOLIA_PLACES_APP_ID,
            apiKey: process.env.ALGOLIA_PLACES_API_KEY
        });
    });
}
module.exports = app => {

    // fetch maps key
    app.post('/api/maps/key', (req, res) => {
        console.log(123);
        res.status(200).json({
            key: process.env.GOOGLE_MAPS_API_KEY
        })
    });
}
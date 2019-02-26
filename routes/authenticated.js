
module.exports = app => {

    // get authentication data from client
    app.post('/api/authenticated', (req, res) => {

        res.status(200).json({
            message: 'Authentication Successful',
            success: true
        });
    });
}
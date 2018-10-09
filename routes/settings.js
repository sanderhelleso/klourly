

module.exports = app => {

    // get updated settings data from client
    app.post('/api/settings', (req, res) => {
        console.log("RECEIVED SETTINGS");
    });
}
module.exports = app => {

    app.post('/api/createRoom', (req, res) => {
        const roomData = JSON.parse(req.body.room);
        console.log(roomData);
    });
}
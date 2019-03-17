const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    app.post('/api/report/getRoomReports', (req, res) => {

        // get reference to the rooms checkins history
        const checkinsRef = db.ref(`rooms/${req.body.roomID}/checkins`);
        checkinsRef.orderByChild('timestamp').once('value', snapshot => {

            const checkins = {};
            Object.entries(snapshot.val())
            .map(([key, val]) => {
                if (val.hasOwnProperty('endTime') && val.type === 'members') {
                    checkins[key] = val
                }
            });

            // send back response containing success message
            // and the rooms checkins history data
           res.status(200).json({
                success: true,
                message: 'Successfully fetched room checkins',
                checkins
            });
        });
    });
}

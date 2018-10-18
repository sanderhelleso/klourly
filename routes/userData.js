const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // get user data from client
    app.post('/api/userData', (req, res) => {

        // get user reference in database
        const ref = db.ref(`users/${req.body.uid}`);

        // retrieve data and send to client
        ref.once('value', snapshot => {
            console.log(snapshot.val());
            res.status(200).json({
                status: 'success',
                userData: snapshot.val()
            });
        }); // add catch?
    });

    // settings
    app.post('/api/updateSettings', (req, res) => {

        // get user reference in database
        const userSettingsRef = db.ref(`users/${req.body.uid}/settings`);
        userSettingsRef.once('value', snapshot => {
            res.status(200).json({
                status: 'success',
                userData: snapshot.val()
            });
        });

        // update settings with new retrieved values
        /*userSettingsRef.update({
            displayName: name,
            phoneNr: '',
            occupation: '',
            status: `Joined Klourly on ${signupDate}`
        });*/
    });
}
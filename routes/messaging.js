const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // set a messaging token for a user
    app.post('/api/messaging/setToken', (req, res) => {
        
        // See documentation on defining a message payload.
        /*var message = {
            data: {
            score: '850',
            time: '2:45'
            },
            token: req.body.token
        };
        
        // Send a message to the device corresponding to the provided
        // registration token.
        firebase.messaging().send(message)
            .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            })
            .catch((error) => {
            console.log('Error sending message:', error);
        });*/

        // get users messaging ref
        const messagingRef = db.ref(`users/${req.body.uid}/messaging`);

        // access messaging ref data
        messagingRef.once('value', snapshot => {

            // if no ref is set (eg: first time user),
            // set messaging and token ref
            if (!snapshot.val()) {
                messagingRef.set({ token: req.body.token });
            }

            // if set but token is equal (no need to update)
            else if (snapshot.val().token !== req.body.token)  {
                messagingRef.update({ token: req.body.token });
            }

            // send back response with success message
            res.status(200).json({
                success: true,
                message: 'Successfully validated messaging token'
            });

        });
    });
}
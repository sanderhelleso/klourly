const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // set a messaging token for a user
    app.post('/api/messaging/setToken', (req, res) => {

        // get users messaging ref
        const messagingRef = db.ref(`users/${req.body.uid}/messaging`);

        // access messaging ref data
        messagingRef.once('value', snapshot => {

            // if no ref is set (eg: first time user),
            // set messaging and token ref
            if (!snapshot.exists()) messagingRef.set({ token: req.body.token });

            // if set but token is equal (no need to update)
            else if (snapshot.val().token !== req.body.token) messagingRef.update({ token: req.body.token });

            // send back response with success message
            res.status(200).json({
                success: true,
                message: 'Successfully validated messaging token'
            });

        });
    });

    // get a messaging token for a user
    app.post('/api/messaging/getToken', (req, res) => {
        // todo
    });

    // get all messaging tokens for members of a room
    app.post('/api/messaging/getRoomMembersToken', (req, res) => {

        // itterate over members
        req.body.members.forEach(uid => {

            // get users messaging ref
            const userRef = db.ref(`users/${uid}`);

            // add notification
            userRef.child('notifications').push({
                message: req.body.data.body,
                timestamp: new Date().getTime(),
                image: req.body.data.icon,
                redirect: {
                    redirectText: 'Take me there',
                    redirectTo: req.body.data.click_action
                }
            });

            // access users messaging token
            userRef.child('messaging/token').once('value', snapshot => {

                // validate that token is present
                if (snapshot.exists()) {

                    // See documentation on defining a message payload.
                    const message = {
                        data: req.body.data,
                        token: snapshot.val()
                    };
                    
                    // Send a message to the device corresponding to the provided registration token.
                    firebase.messaging().send(message)
                        .then(response => console.log('Successfully sent message:', response))
                        .catch(error => console.log('Error sending message:', error));
                }
            });
        });

        // send back response with success message
        res.status(200).json({
            success: true,
            message: 'Successfully published notification that room is active'
        });
    });
}
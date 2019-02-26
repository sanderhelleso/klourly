const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = (req, res, next) => {

    const ref = db.ref(`users/${req.body.uid}/verificationID`);
    ref.once('value', snapshot => {

        // no verification ID, account has consumed token, continue
        if (!snapshot.exists()) return next();

        // if not, account is not verified,
        res.status(403).json({ 
            success: false,
            error: 'Account not verified',
            message: 'Your account needs to be verified to perform this action. Please click the link sent to the account registered e-mail address.' 
        });
    });
};

const FirebaseAuth = require('firebaseauth');
const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const admin = require('firebase-admin');
const db = admin.database();
const ref = db.ref("users");
const jwt = require('jsonwebtoken');

module.exports = (app, passport) => {

    // handle initial google auth flow
    app.get('/api/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    // handle google auth callback flow
    app.get('/api/auth/google/handleCB',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res) => {

            //console.log(req.user);

            // check if user already exists in system
            admin.auth().getUserByEmail(req.user.profile.emails[0].value)
            .then(() => {

                // user already exists in app, login
                login(req.user.token, false, res);
            })
            .catch(err => { 

                // user doesn't exist yet, create it...
                if (err.code === 'auth/user-not-found') {
                    login(req.user.token, true, res);
                }
            });
        }
    );
}

function login(token, isNewUser, res) {
    firebase.loginWithGoogle(token, async (err, result) => {

        // handle login in errors
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Unable to login with Google. Please try again'
            });
        }

        // login user with google credentials
        else {

            // if new user, create user record in db
            let userData;
            if (isNewUser) userData = await createUserInfo(result.user);
            else userData = await getUserInfo(result.user);

            // create JWT
            jwt.sign({ uid: result.user.id }, process.env.JWT_SECRET, 
            (error, token) => {

                // destructor user data
                const { email, id, authenticatedWith } = result.user;

                // validate error
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: 'Hmm, this is our mistake. We are unable to log you in at this time',
                        reason: 'Unable to sign JWT',
                        error
                    });
                }

                // return credentials and data to user, login and redir on client
                res.status(200).json({
                    success: true,
                    message: 'Successfully authenticated with Google',
                    user: { email, id, authenticatedWith, token },
                    userData
                });
            });
        }
    });
}

// create user info
async function createUserInfo(user) {

    // set the user UID reference for the contents of user.
    const signupDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const usersRef = ref.child(user.id);

    // create data
    const userData = {
        signupDate: signupDate,
        settings: {
            displayName: user.displayName,
            phoneNr: '',
            occupation: '',
            status: `Joined Klourly on ${signupDate}`,
            photoUrl: user.photoUrl,
            newsLetter: false
        }
    };

    // set and return data
    await usersRef.set(userData);
    return userData;
}

// get user info
async function getUserInfo(user) {

    // get user ref and return data
    const usersRef = ref.child(user.id);
    return await usersRef.once('value', snapshot => snapshot.val());
}
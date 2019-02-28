const nodemailer = require('nodemailer');

module.exports = email = {
    sendVerification,
    sendRoomInvite,
    sendforgotPassword
}

// smtp configuration
const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.SMTP_UNAME,
        pass: process.env.SMTP_PASS
    }
};

// mail transporter
const transporter = nodemailer.createTransport(smtpConfig);

// send a verification mail to user
function sendVerification(email, verificationID, userID) {

    // create link
    const link = `${process.env.DOMAIN}/verify-account/${verificationID}/${userID}`;

    // set mail options
    const mailOptions = {
        from: 'hi@klourly.com', // sender address
        to: email, // list of receivers
        subject: 'Email verification', // Subject line
        text: `Email verification, press here to verify your email: ${link}`,
        html: `<b>Hello there,<br> click <a href=${link}> here to verify</a></b>` // html body
    };

    // send mail
    transporter.sendMail(mailOptions, (error, response) => {
        if(error) console.log(error);
        else console.log('Message sent');
    });
}

// send a room invite code to a list of  recipients
function sendRoomInvite(recipients, roomID, invitationCode) {

    // create link
    const link = `${process.env.DOMAIN}/join-room/${invitationCode}/${roomID}`;

    // set mail options
    const mailOptions = {
        from: 'hi@klourly.com', // sender address
        to: recipients, // list of receivers
        subject: 'Room Invite', // Subject line
        text: `A user has invited you to join a room: ${link}`,
        html: `<b>Hello there,<br> click <a href=${link}> here to join room</a></b>` // html body
    };

    // send mail
    transporter.sendMail(mailOptions, (error, response) => {
        if(error) console.log(error);
        else console.log('Message sent');
    });
}

// send a forgot password mail to recipient
function sendforgotPassword(email, resetCode, userID) {

    // create link
    const link = `${process.env.DOMAIN}/forgot-password/reset/${resetCode}/${userID}`;

    // set mail options
    const mailOptions = {
        from: 'hi@klourly.com', // sender address
        to: email, // list of receivers
        subject: 'Reset Password', // Subject line
        text: `Reset your password: ${link}`,
        html: `<b>Hello there,<br> click <a href=${link}> here to reset your password</a></b>` // html body
    };

    // send mail
    transporter.sendMail(mailOptions, (error, response) => {
        if(error) console.log(error);
        else console.log('Message sent');
    });
}
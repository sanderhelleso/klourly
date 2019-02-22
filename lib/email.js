const nodemailer = require('nodemailer');

module.exports = email = {
    sendVerification
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
function sendVerification(email, link) {

    const mailOptions = {
        from: 'hi@klourly.com', // sender address
        to: email, // list of receivers
        subject: 'Email verification', // Subject line
        text: `Email verification, press here to verify your email: ${link}`,
        html: `<b>Hello there,<br> click <a href=${link}> here to verify</a></b>` // html body
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if(error) console.log(error);
        else console.log('Message sent');
    });
}
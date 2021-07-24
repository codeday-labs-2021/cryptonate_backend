const nodemailer = require("nodemailer");
require("dotenv").config();

//TODO: change transporter during production
const sendEmail = async options => {
    //create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //define the email options
    const mailOptions = {
        from: "Cryptonate <hello@cryptonate.com>",
        to: options.email,
        subject: options.subject,
        text: options.text
    }

    //send email
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

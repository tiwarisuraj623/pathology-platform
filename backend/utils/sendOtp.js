/*
 * sendOtp is a placeholder function for sending OTP codes via email or SMS.
 * In a production system you would integrate with an SMS gateway or email service.
 */
const nodemailer = require('nodemailer');

const sendOtp = async (recipient, otp) => {
  console.log(`Sending OTP ${otp} to ${recipient}`);
  // Example of using nodemailer for emails (requires EMAIL_USER and EMAIL_PASS in env)
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: recipient,
  //   subject: 'Your OTP Code',
  //   text: `Your OTP code is ${otp}`,
  // };
  // await transporter.sendMail(mailOptions);
};

module.exports = { sendOtp };

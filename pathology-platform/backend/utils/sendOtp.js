/*
 * sendOtp is a placeholder function for sending OTP codes via email or SMS.
 * In a production system you would integrate with an SMS gateway or email service.
 */
const nodemailer = require('nodemailer');

const sendOtp = async (recipient, otp) => {
  /**
   * Attempts to deliver the OTP via email if email credentials are provided.  If neither
   * email credentials nor a Twilio configuration are supplied via environment
   * variables, this function will log the OTP to the console.  In a real
   * deployment you would integrate with an SMS or email provider here.
   */
  // Try email first if credentials are set
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (EMAIL_USER && EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: EMAIL_USER,
        to: recipient,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
      };
      await transporter.sendMail(mailOptions);
      console.log(`OTP sent via email to ${recipient}`);
      return;
    } catch (err) {
      console.error('Failed to send OTP via email:', err.message);
    }
  }
  // Fallback to console output
  console.log(`OTP for ${recipient}: ${otp}`);
};

module.exports = { sendOtp };

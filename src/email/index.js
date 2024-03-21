const nodemailer = require("nodemailer");
/**
 * @description A function that sends a email to the specified addresses (can not be replied)
 * must has the following envs in your application: HOST_OFFICE, USERNAME_NO_REPLY and PASSWORD_NO_REPLY
 * @param {Array} emails - Array of email addresses
 * @param {string} subject - Subject of the email
 * @param {string} html  - Text of the email
 * @returns  returns a message from transporter nodemailer or null if has error
 */
exports.sendEmailOffice365NoReply = async (emails, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_OFFICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USERNAME_NO_REPLY,
        pass: process.env.PASSWORD_NO_REPLY,
      },
    });

    const from = process.env.USERNAME_NO_REPLY;
    const fromName =
      process.env.domain === "IC" ? "Impostocerto" : "Impostograma";

    const mailOptions = {
      from: `${fromName} <${from}>`,
      to: emails.join(", "),
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

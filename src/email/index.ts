import * as nodemailer from 'nodemailer';

export const sendEmailOffice365NoReply = async (
  emails: string[],
  subject: string,
  html: string
) => {
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
      process.env.domain === 'IC' ? 'Impostocerto' : 'Impostograma';

    const mailOptions = {
      from: `${fromName} <${from}>`,
      to: emails.join(', '),
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    throw error;
  }
};

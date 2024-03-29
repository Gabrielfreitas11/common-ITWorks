import { sendEmailOffice365NoReply } from './index';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue('sended'),
  })),
}));

describe('sendEmailOffice365NoReply function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email using Office 365', async () => {
    //Arrange
    const emails = ['recipient@example.com'];
    const subject = 'Test Subject';
    const html = '<p>This is a test email</p>';

    process.env.HOST_OFFICE = 'your_office365_host';
    process.env.USERNAME_NO_REPLY = 'your_no_reply_username';
    process.env.PASSWORD_NO_REPLY = 'your_no_reply_password';
    process.env.domain = 'IC';

    const expectedMailOptions = {
      from: 'Impostocerto <your_no_reply_username>',
      to: 'recipient@example.com',
      subject: 'Test Subject',
      html: '<p>This is a test email</p>',
    };

    //Act
    const response = await sendEmailOffice365NoReply(emails, subject, html);

    //Assert
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'your_office365_host',
      port: 587,
      secure: false,
      auth: {
        user: 'your_no_reply_username',
        pass: 'your_no_reply_password',
      },
    });

    expect(response).toEqual('sended');
  });
});

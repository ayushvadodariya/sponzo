import nodemailer from 'nodemailer'

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      } 
    })

    // await transporter.verify();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    })
    
    if (info.rejected && info.rejected.length > 0) {
      throw new Error(`Email delivery failed to: ${info.rejected.join(', ')}`);
    }
    
    return info;

  } catch(error) {
    if (error.code === 'EENVELOPE' || error.message.includes('RecipientError')) {
      throw new Error(`Invalid recipient email address: ${to}`);
    } else if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Check your credentials.');
    } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      throw new Error('Could not connect to email server. Please try again later.');
    } else if (error.responseCode === 550) {
      throw new Error(`Email address doesn't exist or is not accepting emails: ${to}`);
    } else {
      console.error('Email sending error:', error);
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }
  }
}

export { sendEmail }
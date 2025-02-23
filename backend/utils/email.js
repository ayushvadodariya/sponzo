import mongoose from 'mongoose';
import nodemailer from 'nodemailer'

async function sendEmail(to, subject, text ){

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure:Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      } 
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text:text,
    })

  } catch(error) {
    throw new Error(error)
  }
}

export { sendEmail }
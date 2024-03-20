import ejs from 'ejs';
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url'; 

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
  
  async function sendEmail(data) {
    try {
      const { firstname, lastname, reason_for_visit, date, time } = data;
  
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.COPY_EMAIL,
        subject: "New Order Received",
        text: `
              Hello,

              A new appointment received:
              
              - Firstname: ${firstname}
              - Lastname: ${lastname}
              - Reason For Visit: ${reason_for_visit}
              - Date: ${date}
              - Time: ${time}
              
              
          `,
        html: `
              <p>Hello,</p>
              <p>A new appointment received:</p>
              <ul>
                  <li>Firstname: ${firstname}</li>
                  <li>Lastname: ${lastname}</li>
                  <li>Reason For Visit: ${reason_for_visit}</li>
                  <li>Date: ${date}</li>
                  <li>Time: ${time}</li>

                  
              </ul>
          `,
      });
  
      console.log("Message sent: %s", info.messageId);
      return info.messageId;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  
  export { sendEmail };

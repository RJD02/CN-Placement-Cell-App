import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

const transporter = nodemailer.createTransport({
  port: 1025,
});

export const sendEmail = async (mailOptions: MailOptions) => {
  const info = await transporter.sendMail(mailOptions);
  console.log(info.messageId);
};

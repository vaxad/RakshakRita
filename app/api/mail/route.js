import { NextResponse } from "next/server"
import nodemailer from 'nodemailer';
import Report from "../../../lib/db/models/Reports";
import connect from "../../../lib/db/connection"


async function sendMail(recipientEmail, pdfBase64) {
  console.log(recipientEmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  
  const mailOptions = {
    from: 'testvaxad@gmail.com',
    to: recipientEmail,
    subject: 'Report regading the performance of Police Stations in Gujarat',
    text: 'This mail is auto-generated every month by RakshakRita to keep you updated! You can access more insights and atual feedbacks by using our mobile app.',
    attachments: [
      {
        filename: `report_${(new Date(Date.now())).getMonth()}_${(new Date(Date.now())).getFullYear()}.pdf`,
        content: pdfBase64,
        encoding: 'base64',
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}


export async function PUT(req, res) {
    
  try {
    const db = await connect()
      const reports = await Report.find()
      const report = reports[0]
      if(report.createdAt.getMonth()!==(new Date(Date.now())).getMonth()){
        report.createdAt = Date.now()
        await report.save()
        return NextResponse.json({send: true})
      }else{
        return NextResponse.json({send: false})
      }
    
  } catch (err) {
      console.log(err)
      return NextResponse.json({success: false, error: err.message})
  }
}

import { NextResponse } from "next/server"
// import {PythonShell} from 'python-shell';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';
import axios from 'axios';

// const runModel = async (file,options)=>{
//     const response = await PythonShell.run(file,options);
//     return response;
// }

async function sendMail(recipientEmail, pdfBase64) {
  console.log(recipientEmail)
  // Create a Nodemailer transporter using your email service's credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
    auth: {
      user: 'testvaxad@gmail.com',
      pass: 'atxb zxxo tbvs sbwp',
    },
  });
    // Define the email message
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

async function htmlToPdf(htmlString) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Set the content of the page with your HTML string
    await page.setContent(htmlString, { waitUntil: 'networkidle2' });
  
    // Generate PDF from the page
    // await page.pdf({ path: outputPath, format: 'A4' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
  
    await browser.close();
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
  // Set up the recipient email address
   const recipientEmail = "varadprabhu111@gmail.com"
    await sendMail(recipientEmail, pdfBase64)
  }

  async function mail(){
    console.log("working")
    const resp = await axios.post("https://rakshakrita-api-v2.onrender.com/mail")
    const response = await resp.data.html
    console.log("working")
    // const outputPath = 'output.pdf';
    const htmlString = response.join(' ')
    console.log(htmlString)
    htmlToPdf(htmlString)
  }
  
export async function POST(req, res) {
    
    try {
        // const response = await runModel('app/api/mail/pyfile/main.py',{})
        mail()
        return NextResponse.json({success: true})
        
    // console.log(response)
      
    } catch (err) {
        console.log(err)
        return NextResponse.json({success: false, error: err.message})
    }
}

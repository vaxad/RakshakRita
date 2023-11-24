// import { NextResponse } from "next/server"
// // import {PythonShell} from 'python-shell';
// import puppeteer from 'puppeteer';
// import nodemailer from 'nodemailer';
// import Report from "../../../lib/db/models/Reports";
// import connect from "../../../lib/db/connection"

// // const runModel = async (file,options)=>{
// //     const response = await PythonShell.run(file,options);
// //     return response;
// // }

// async function sendMail(recipientEmail, pdfBase64) {
//   console.log(recipientEmail)
//   // Create a Nodemailer transporter using your email service's credentials
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
//     auth: {
//       user: 'testvaxad@gmail.com',
//       pass: 'atxb zxxo tbvs sbwp',
//     },
//   });
//     // Define the email message
//   const mailOptions = {
//     from: 'testvaxad@gmail.com',
//     to: recipientEmail,
//     subject: 'Report regading the performance of Police Stations in Gujarat',
//     text: 'This mail is auto-generated every month by RakshakRita to keep you updated! You can access more insights and atual feedbacks by using our mobile app.',
//     attachments: [
//       {
//         filename: `report_${(new Date(Date.now())).getMonth()}_${(new Date(Date.now())).getFullYear()}.pdf`,
//         content: pdfBase64,
//         encoding: 'base64',
//       },
//     ],
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }

// async function htmlToPdf(htmlString) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
  
//     // Set the content of the page with your HTML string
//     await page.setContent(htmlString, { waitUntil: 'networkidle2' });
  
//     // Generate PDF from the page
//     // await page.pdf({ path: outputPath, format: 'A4' });
//     const pdfBuffer = await page.pdf({ format: 'A4' });
  
//     await browser.close();
//     const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
//   // Set up the recipient email address
//    const recipientEmail = "varadprabhu111@gmail.com"
//     await sendMail(recipientEmail, pdfBase64)
//   }

//   // async function mail(){
//   //   htmlToPdf(htmlString)
//   // }
  
// export async function POST(req, res) {
    
//     try {
//         // const response = await runModel('app/api/mail/pyfile/main.py',{})
//         const bodyObject = await req.json()
//         const htmlString = bodyObject.html
//         // console.log(htmlString)
//         htmlToPdf(htmlString)
//         return NextResponse.json({success: true})
        
//     // console.log(response)
      
//     } catch (err) {
//         console.log(err)
//         return NextResponse.json({success: false, error: err.message})
//     }
// }

// export async function PUT(req, res) {
    
//   try {
//     const db = await connect()
//       const reports = await Report.find()
//       const report = reports[0]
//       if(report.createdAt.getMonth()!==(new Date(Date.now())).getMonth()){
//       // if(report.createdAt.getHours()!==(new Date(Date.now())).getHours()){
//         report.createdAt = Date.now()
//         await report.save()
//         return NextResponse.json({send: true})
//       }else{
//         return NextResponse.json({send: false})
//       }
    
//   } catch (err) {
//       console.log(err)
//       return NextResponse.json({success: false, error: err.message})
//   }
// }

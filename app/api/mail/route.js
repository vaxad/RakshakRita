import { NextResponse } from "next/server"
import {PythonShell} from 'python-shell';
import { spawn } from "child_process";
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';

const runModel = async (file,options)=>{
    const response = await PythonShell.run(file,options);
    return response;
}

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

  
export async function POST(req, res) {
    
    try {
        // const response = await runModel('app/api/mail/pyfile/main.py',{})
        const process = spawn('python', ['app/api/mail/pyfile/main.py']);
        const response = []
        process.stdout.on('data', (data) => {
          response.push(data.toString())
          // console.log(`stdout: ${response[0]}`);
          if(response.length == 1)
          htmlToPdf(response[0])
  .then(() => console.log('PDF generated successfully'))
  .catch(error => {console.error('Error generating PDF:', error); return NextResponse.json({success: false, error: error.message});})
    // console.log(response)
        });

      
        process.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          return NextResponse.json({success: false, error: data})
        });
      
        process.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          return NextResponse.json({success: true})
        });
        // const outputPath = 'output.pdf';
  //       const htmlString = response.join(' ')
  //       htmlToPdf(htmlString)
  // .then(() => console.log('PDF generated successfully'))
  // .catch(error => {console.error('Error generating PDF:', error); return NextResponse.json({success: false, error: error.message});})
  //   // console.log(response)
  return NextResponse.json({success: true})

    } catch (err) {
        console.log(err)
        return NextResponse.json({success: false, error: err.message})
    }
}

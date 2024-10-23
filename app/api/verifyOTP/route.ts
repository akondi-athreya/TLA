"use server";
import { NextResponse } from "next/server";
const nodemailer = require('nodemailer');
import fs from 'fs';
import Handlebars from 'handlebars';
import { generateOTP, storeOTP } from '../../lib/otpservice';


export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "akondiathreya@gmail.com",
                pass: "fwco tipe gxpc hzdr"
            }
        });
        const {username} = data;
        let otp = generateOTP();
        await storeOTP(data.email , otp);
        // const source = fs.readFileSync('app/email/index.hbs','utf8');
        // const template = Handlebars.compile(source);
        // const html_temp = template({username,otp});

        const emailPage = `
        <div style="font-size:24px;">Dear <span style="color:#f72585">${username}</span>,</div><br/>
        <div style="font-size:24px">Your Otp is : <span style="font-weight:600;">${otp}</span></div>
        `
        

        const mailOptions = {
            from: "akondiathreya@gmail.com",
            to: data.email,
            subject: "Verification Otp for TLA",
            html: emailPage
        };

        // Use await here
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail sent: ', info.response);

        // Return success response
        return NextResponse.json({ message: 'Mail Sent Successfully'}, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to send email', details: err }, { status: 500 });
    }
}

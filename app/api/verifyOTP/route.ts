import { NextResponse } from "next/server";
const nodemailer = require('nodemailer');
import fs from 'fs';
import Handlebars from 'handlebars';


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
        const {username , otp} = data;
        const source = fs.readFileSync('app/email/index.hbs','utf8');
        const template = Handlebars.compile(source);
        const html_temp = template({username,otp});
        

        const mailOptions = {
            from: "akondiathreya@gmail.com",
            to: data.email,
            subject: "Verification Otp for TLA",
            html: html_temp
        };

        // Use await here
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail sent: ', info.response);

        // Return success response
        return NextResponse.json({ message: 'Mail Sent Successfully',email:data.email,otp:data.otp,username:data.username }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to send email', details: err }, { status: 500 });
    }
}

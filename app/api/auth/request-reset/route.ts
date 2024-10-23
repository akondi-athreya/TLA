"use server";
import { NextResponse } from 'next/server';
import crypto from 'crypto';
const nodemailer = require('nodemailer');
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';
import fs from 'fs';
import Handlebars from 'handlebars';

export async function POST(req: Request) {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: 'Email is required' }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ email: email });
    if (!user) return NextResponse.json({ message: 'If that email address is in our database, we will send you an email to reset your password.' });

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = Date.now() + 3600000; // 1-hour expiration

    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akondiathreya@gmail.com',
            pass: 'fwco tipe gxpc hzdr',
        },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${email}`;

    const source = fs.readFileSync('app/email/resetPassword.hbs', 'utf8');
    const template = Handlebars.compile(source);
    const html_temp = template({resetLink});

    const result = await transporter.sendMail({
        from: "akondiathreya@gmail.com",
        to: email,
        subject: 'Password Reset Request',
        html: html_temp
    });

    if (result) return NextResponse.json({ message: 'If that email address is in our database, we will send you an email to reset your password.' }, { status: 200 });
    else return NextResponse.json({ message: 'error' }, { status: 500 });
}

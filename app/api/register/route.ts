"use server";
import { NextResponse } from "next/server";
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import otpSchema from '@/app/models/otp'

export async function POST(req: Request) {
    connectDB();
    try {
        const [userInfo, userEnteredOtp] = await req.json();
        const { email, username, password } = userInfo;
        console.log(email , username , password , userEnteredOtp);

        if (!email || !username || !password || !userEnteredOtp) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Fetch OTP record by email
        const otpRecord = await otpSchema.findOne({ email });
        if (!otpRecord) {
            return NextResponse.json({ message: 'OTP not found or was never generated' }, { status: 404 });
        }

        // Check if the OTP is expired
        const currentTime = new Date();
        if (otpRecord.expiresAt < currentTime) {
            return NextResponse.json({ message: 'OTP has expired' }, { status: 401 });
        }

        // Compare the OTPs
        if (otpRecord.otp !== userEnteredOtp) {
            return NextResponse.json({ message: 'Invalid OTP' }, { status: 402 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user with hashed password
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // Generate a token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // Token expiration (1 hour)
        );
        await otpSchema.deleteOne(otpRecord);

        return NextResponse.json({ message: "User created successfully", token }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
    }
}
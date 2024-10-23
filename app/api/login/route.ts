"use server";
import { NextResponse } from "next/server";
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    connectDB();
    try {
        const { username, password } = await req.json();

        const dbUser = await User.findOne({ username:username });
        if (!dbUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: dbUser._id, username: dbUser.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

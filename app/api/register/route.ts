import { NextResponse } from "next/server";
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    connectDB();
    try {
        const { email, username, password } = await req.json();

        if (!email || !username || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
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

        return NextResponse.json({ message: "User created successfully", token }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
    }
}
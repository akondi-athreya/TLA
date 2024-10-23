// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
const bcrypt = require('bcrypt');
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';

export async function POST(req: Request) {
    const { token, email, password } = await req.json();
    if (!token || !email || !password) return NextResponse.json({ message: 'Invalid data' }, { status: 400 });

    await connectDB();

    const user = await User.findOne({
        email,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({ message: 'Password has been reset successfully' });
}

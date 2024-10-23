import { NextResponse } from "next/server";
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';



export async function GET() {
    connectDB();
    try {
        const result = await User.find({});
        if (result) {
            return NextResponse.json({data: result},{status: 200});
        } else {
            return NextResponse.json({message: "Data not Found" },{status: 400});
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create user" },{status: 500});
    }
}
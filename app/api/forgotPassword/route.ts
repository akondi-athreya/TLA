import { NextResponse } from "next/server";
import DBconnection from "@/app/lib/db";
import User from '@/app/models/user'


const connect = async () => {
    await DBconnection();
}
connect();

export async function POST(req: Request) {
    try {
        const {otp , email} = await req.json();
        const result = await User.findOne({email: email})
        if(result != null) return NextResponse.json({message:'ok'},{status:202});
        else return NextResponse.json({message: "Invalid email."},{status: 400});
    } catch (err) {
        console.error(err)
        return NextResponse.json({message:'Internal Server Error'},{status: 500});
    }
}
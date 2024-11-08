import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'

connectDB();



export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: new Date() }
        });

        if(!user){
            return NextResponse.json({error:"Invalid Token Details"},{status:400})
        }

        user.isVerified = true;
        user.vefifyToken = undefined;
        user.verifyTokenExpiry = undefined

        await user.save()//should be await becaise we are using db

        return NextResponse.json({
            message:"Email Verified successfully",
            user
        },{status: 500})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

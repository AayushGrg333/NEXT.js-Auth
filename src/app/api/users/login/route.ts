import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { projectTraceSource } from 'next/dist/build/swc/generated-native';


connectDB();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password}  = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User not found"},{status:400})
        }

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error: "Check your credentials"},{status:400})
        }

        const payload = {
            userId: user._id,
            userName: user.username,
            userEmail: user.email,
        }

        const secretKey= process.env.JWT_SECRET_KEY
        const cookieToken = jwt.sign(payload,secretKey!,{ expiresIn: '1d' })

        const response = NextResponse.json({
            message:"logged in Success",
            success:true
        });

        response.cookies.set("token", cookieToken,{
            httpOnly: true
        })

        return response

    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }

    
}
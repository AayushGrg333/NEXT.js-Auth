import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

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

    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }

    
}
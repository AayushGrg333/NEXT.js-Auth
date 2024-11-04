import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import {sendEmail} from '@/helpers/mailer'

connectDB();


export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        //validation
        console.log(reqBody);

        const user = await User.findOne({email});
        if (user){
            return NextResponse.json({error:"User already exists go to login",
                status:400
            })
        }

            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(password,salt)

            const savedUser = await User.create({
                username,
                email,
                password:hashedPassword,
            });

            console.log(savedUser);

            //send verification mail

            await sendEmail({email, emailType: "VERIFY",userId:savedUser._id})

            return NextResponse.json({
                message:"user registered successfuly",
                success: true,
                savedUser,
            })
            


    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }
}
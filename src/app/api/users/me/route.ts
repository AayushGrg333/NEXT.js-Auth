import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDatafromToken';

connectDB();

export async function POST(request:NextRequest) {
    //extract data from token
    const userID = await getDataFromToken(request);
    const user = await User.findOne({_id:userID}).select("-password");

    //check if there is no user 
    return NextResponse.json({
        message:"User found",
        data:user,
    })
}
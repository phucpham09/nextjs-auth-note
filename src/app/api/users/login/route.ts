import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request: NextRequest){
    
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        const user = await User.findOne({email});
        
        if(!user){
            return NextResponse.json({
                error:'User does not exist',
            }, {status: 400})
        }
        
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({
                message:'Incorrect password',
            }, {status: 400})
        }

        //if login successfully
        
        const tokenData= {
            id: user._id,
            email: user.email,
            password: user.password
        }
        
        
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: 'Login successfully!',
            success: true,
            token
        })

        response.cookies.set("token", token,{
            httpOnly: false,
            path: '/'
        })
        return response;


        } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            message:error.message
        }, {status: 500})
    }
}
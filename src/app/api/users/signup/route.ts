import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, password, email} = reqBody;
        
        const user = await User.findOne({email});
        //user already existed
        if(user){
            return NextResponse.json({
                error: 'User already existed!'
            }, {status: 400})
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword
        });
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: 'Registered Succesfully',
            success: true,
            savedUser
        })
    } catch (error : any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500})
    }
}
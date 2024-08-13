import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import getDataFromToken from '@/helpers/getDataFromToken';
import {connect} from '@/dbConfig/dbConfig'

connect()

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        console.log(userId);
        const user = await User.findOne({_id: userId})
        return NextResponse.json({
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({
            message:error.message
        }, {status: 400})
    }
    
}
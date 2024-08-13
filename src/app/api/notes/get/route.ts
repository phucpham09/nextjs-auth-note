import Note from  '@/models/noteModel'
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import getDataFromToken from '@/helpers/getDataFromToken'
connect()

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const response = await Note.find({userId});
        return NextResponse.json({
            data: response
        })
        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        })
    }
    

}
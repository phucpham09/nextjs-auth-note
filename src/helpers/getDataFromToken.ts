import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export default function getDataFromToken(request: NextRequest){
    try {
        const token =  request.cookies.get('token')?.value || '';
        const decodedData:any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedData.id;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
    
}
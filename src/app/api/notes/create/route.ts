import Note from  '@/models/noteModel'
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import getDataFromToken from '@/helpers/getDataFromToken'
connect()

interface NoteBody {
    title: string;
    content: string;
}

export async function POST(request: NextRequest){
    try {
        const reqBody: NoteBody = await request.json();
        const {title, content} = reqBody;
        const userId = await getDataFromToken(request);
        console.log(userId);
        const newNote = new Note({
            title: title,
            content: content,
            userId: userId, 
            });
    
            // Lưu note vào database
            await newNote.save();
    
            return NextResponse.json({
                message: 'Note created successfully',
                note: newNote
            }, { status: 201 });
        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500})
    }
    

}
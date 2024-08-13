import { NextRequest, NextResponse } from "next/server";
import Note from '@/models/noteModel'
import getDataFromToken from "@/helpers/getDataFromToken";


export async function DELETE(request: NextRequest, { params }: { params: { id: String }}) {
    try {
        const {id} = params;
        console.log(id);
        const userId = await getDataFromToken(request);
        const result = await Note.find({_id : id}, userId);
        if(!result){
            return NextResponse.json({
                 message: 'Note not found or not authorized to delete.' 
            }, {status: 404})
        }
        await Note.deleteOne({_id: id});
        return NextResponse.json({
            message: 'Note Delete successfully!',
            success: true
        })

    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500})
    }
}
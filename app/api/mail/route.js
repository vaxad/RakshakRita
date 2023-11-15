import { NextResponse } from "next/server"
import {PythonShell} from 'python-shell';

const runModel = async (file,options)=>{
    const response = await PythonShell.run(file,options);
    return response;
}

export async function POST(req, res) {
    
    try {
        const response = await runModel('app/api/mail/pyfile/main.py',{})
    console.log(response)
    return NextResponse.json({response:response})
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

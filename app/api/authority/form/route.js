import connect from "../../../../lib/db/connection"
import Authorities from "../../../../lib/db/models/Authorities"
import Forms from "../../../../lib/db/models/Forms"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { headers } from "next/headers";

export async function POST(req){
    try {
        const headersList = headers();
        const token = headersList.get('authToken');
        const obj = jwt.verify(token,process.env.JWT_SECRET)
        const db = await connect()
        const bodyObject = await req.json()

        console.log(bodyObject.fields[0])
        const oldAuthority = await Authorities.find({policeId:obj.authorityId})
        if(!oldAuthority){
        return NextResponse.json({message:"access denied"})
        }else{
            const form =await Forms.create({fields:bodyObject.fields, authorityId:obj.authorityId})
            return NextResponse.json({form:form, success:true})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error})
    }
}

export async function PUT(req){
    try {
        const db = await connect()
        const bodyObject = await req.json()
        const authority = await Authorities.findOne({policeId:bodyObject.policeId})
        if(authority){
        if(authority.email===bodyObject.email&&authority.password===bodyObject.password){
            const authToken = jwt.sign({authorityId: authority._id},process.env.JWT_SECRET)
            return NextResponse.json({authToken:authToken, success:true})
        }
    }
        return NextResponse.json({message:"incorrect credentials", success:false})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error})
    }
}

export async function GET(req){
    try {
        //.log(token)
        const db = await connect()
        const form = await Forms.find().sort({ createdAt: -1 }).limit(1)
            return NextResponse.json({form: form[0], success:true})
    } catch (error) {
        return NextResponse.json({error:error})
    }
}
import connect from "../../../lib/db/connection"
import Authorities from "../../../lib/db/models/Authorities"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { headers } from "next/headers";

export async function POST(req){
    try {
        const db = await connect()
        const bodyObject = await req.json()
        //.log(bodyObject)
        const oldAuthority = await Authorities.find({policeId:bodyObject.policeId})
        if(!oldAuthority){
        const authority = await Authorities.create({name:bodyObject.name, email:bodyObject.email, password:bodyObject.password, post:bodyObject.post, state:bodyObject.state, district:bodyObject.district, taluka:bodyObject.taluka, village: bodyObject.village})
        return NextResponse.json({authority:authority})
        }else{
            return NextResponse.json({message:"authority already exists"})
        }
    } catch (error) {
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
        const headersList = headers();
        const token = headersList.get('authToken');
        //.log(token)
        const db = await connect()
        const obj = jwt.verify(token,process.env.JWT_SECRET)
        //.log(obj)
        if(obj){
        const authority = await Authorities.findById(obj.authorityId)
            return NextResponse.json({authority:authority, success:true})
        }
        return NextResponse.json({message:"authorization failed", success:false})
    } catch (error) {
        return NextResponse.json({error:error})
    }
}
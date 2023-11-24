
import connect from "../../../../lib/db/connection";
import Feedback from "../../../../lib/db/models/Feedback";
import Stations from "../../../../lib/db/models/Stations";
// import { headers } from "next/headers";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function POST(req,res) {
    try {
        // const headersList = headers();
        // const token = headersList.get('authToken');
        //.log(token)
        const db = await connect()
        // const obj = jwt.verify(token,process.env.JWT_SECRET)
        //.log(obj)
        // if(obj){
            const bodyObject = await req.json()
            const feedbacks = await Feedback.find({ stationId: bodyObject.stationId })
            return NextResponse.json({ feedbacks: feedbacks })
        // }
        // return NextResponse.json({message:"authorization failed", success:false})
        
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

export async function PUT(req,res) {
    try {
        // const headersList = headers();
        // const token = headersList.get('authToken');
        //.log(token)
        const db = await connect()
        // const obj = jwt.verify(token,process.env.JWT_SECRET)
        //.log(obj)
        // if(obj){
            const bodyObject = await req.json()
            const stns  = await Stations.find();
            const filterstn = stns.filter((stn) => bodyObject.district?stn.district.toLowerCase().includes(bodyObject.district.toLowerCase()):true)
            console.log(filterstn)
            const feedbacks = await Feedback.find({ stationId: {$in:filterstn.map((stn)=>stn._id)} })
            return NextResponse.json({ feedbacks: feedbacks })
        // }
        // return NextResponse.json({message:"authorization failed", success:false})
        
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

export async function GET(req,res) {
    try {
        const db = await connect()
            const feedbacks  = await Feedback.find();
            const desiredOrder = ["_id","description","issue","id","type","stationId","createdAt","__v","attachment"]
            const transformedFeedbacks = feedbacks.map(feedback => {
                const sortedDoc = {};
                desiredOrder.forEach(key => {
                  if (feedback[key] !== undefined) {
                    sortedDoc[key] = feedback[key];
                  }
                });
                return sortedDoc;
              });
            
            return NextResponse.json({ feedbacks: transformedFeedbacks })
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
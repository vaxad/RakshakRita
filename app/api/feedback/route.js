import connect from "../../../lib/db/connection"
import Feedback from "../../../lib/db/models/Feedback"
import { NextResponse } from "next/server"

export async function POST(req, res) {
    try {
        const db = await connect()
        const bodyObject = await req.json()
        let ctr = false
        // const oldFeedBacks = await Feedback.find({ id: bodyObject.id, stationId: bodyObject.stationId })
        // if (oldFeedBacks)
        //     oldFeedBacks.forEach(feedback => {
        //         if (feedback.createdAt.getTime() + 86400000 < Date.now()) { // this should be feedback+24hours>date.now
        //             ctr = true;
        //         }
        //     })
        if (ctr) {
            return NextResponse.json({ message: "you can only give one feedback for one police station per day" })
        } else {
            const feedback = await Feedback.create({ description: bodyObject.description, issue:bodyObject.issue, attatchment: bodyObject.attatchment, id: bodyObject.id, stationId: bodyObject.stationId, type: bodyObject.type, createdAt: Date.now() })
            return NextResponse.json({ feedback: feedback })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}


export async function PATCH(req, res) {
    try {
        const db = await connect()
        const feedbacks = await Feedback.find()
        const deleteFeedbacks = []
        const updateFeedbacks = []
        for(const feedback of feedbacks){
            if(!feedback.type){
                deleteFeedbacks.push(feedback._id)
            }else if(feedback.attachment!==""){
                updateFeedbacks.push(feedback._id)
            }
        }
        await Feedback.deleteMany({_id:{$in:deleteFeedbacks}})
        await Feedback.updateMany({_id:{$in:updateFeedbacks}},{$set:{attachment:""}})
        return NextResponse.json({ success: updateFeedbacks.length })
        
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

export async function PUT(req, res) {
    try {
        const db = await connect()
        const feedbacks = await Feedback.find()
        const deleteFeedbacks = []
        const updateFeedbacks = []
        for(const feedback of feedbacks){
            if(!feedback.type){
                deleteFeedbacks.push(feedback._id)
            }else if(!feedback.attachment){
                updateFeedbacks.push(feedback._id)
            }
        }
        // await Feedback.deleteMany({_id:{$in:deleteFeedbacks}})
        await Feedback.updateMany({_id:{$in:updateFeedbacks}},{$rename:{"attatchment":"attachment"}})
        return NextResponse.json({ success: true })
        
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
import connect from "../../../lib/db/connection"
import Feedback from "../../../lib/db/models/Feedback"
import { NextResponse } from "next/server"

export async function POST(req, res) {
    try {
        const db = await connect()
        // console.log("hii")
        const bodyObject = await req.json()
        let ctr = false
        console.log(bodyObject)
        const oldFeedBacks = await Feedback.find({ id: bodyObject.id, stationId: bodyObject.stationId })
        // console.log(oldFeedBacks)
        if (oldFeedBacks)
            oldFeedBacks.forEach(feedback => {
                if (feedback.createdAt.getTime() + 86400000 < Date.now()) { // this should be feedback+24hours>date.now
                    ctr = true;
                }
            })
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
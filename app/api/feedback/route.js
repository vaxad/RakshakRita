import connect from "../../../lib/db/connection"
import Feedback from "../../../lib/db/models/Feedback"
import { NextResponse } from "next/server"
import stationIds from "./stnIds.json"

export async function POST(req, res) {
    try {
        const db = await connect()
        const bodyObject = await req.json()
        let ctr = false
        const oldFeedBacks = await Feedback.find({ id: bodyObject.id, stationId: bodyObject.stationId })
        if (oldFeedBacks)
            oldFeedBacks.forEach(feedback => {
                if (feedback.createdAt.getTime() + 86400000 < Date.now()) { // this should be feedback+24hours<date.now
                    ctr = true;
                }
            })
        if (ctr) {
            return NextResponse.json({ message: "you can only give one feedback for one police station per day" })
        } else {
            const feedback = await Feedback.create({ description: bodyObject.description, issue: bodyObject.issue, attatchment: bodyObject.attatchment, id: bodyObject.id, stationId: bodyObject.stationId, type: bodyObject.type, createdAt: Date.now() })
            return NextResponse.json({ feedback: feedback })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

function getRandomString(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export async function PATCH(req, res) {
    try {
        const db = await connect()
        const feedbacks = await Feedback.find()
        const deleteFeedbacks = []
        const updateFeedbacks = []
        for (const feedback of feedbacks) {
            if (!feedback.type) {
                deleteFeedbacks.push(feedback._id)
            } else if (!feedback.attachment) {
                updateFeedbacks.push(feedback._id)
            }
        }
        await Feedback.deleteMany({ _id: { $in: deleteFeedbacks } })
        await Feedback.updateMany({ _id: { $in: updateFeedbacks } }, { $set: { attachment: "" } })
        return NextResponse.json({ success: updateFeedbacks.length })

    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

function getRandomDate(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);

    const randomDate = new Date(randomTimestamp);

    return randomDate;
}

export async function PUT(req, res) {
    try {
        const db = await connect()
        const updateFeedbacks = []
        let ctr = 0;
        for (const id of stationIds) {
            const feedbacks = await Feedback.find({ stationId: id })
            for (const feedback of feedbacks) {
                const startDate = new Date('2023-09-27');
                const endDate = new Date('2023-10-16');
                const randomDate = getRandomDate(startDate, endDate);
                feedback.createdAt = randomDate
                const updatedFeedback = await feedback.save()
                ctr++;
                console.log(ctr+", "+updatedFeedback._id)

            }
        }
        return NextResponse.json({ success: true })

    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
import connect from "../../../../lib/db/connection"
import Feedback from "../../../../lib/db/models/Feedback"
import Station from "../../../../lib/db/models/Stations"
import { NextResponse } from "next/server"
import fs from 'fs'
import unreviewedStns from "./unreviewdStns.json"
import heatmapData from "./heatmapData.json"
import Heatmap from "../../../../lib/db/models/Heatmap"

export async function POST(req, res) {
    try {
        const db = await connect()
        let ctr = false
        const oldStations = await Station.find()
        let allStns = new Set()
        if (oldStations){
             for( const Station of oldStations) {
                allStns.add(Station._id.toString())
            }
        }
        let reviewed = new Set()
        const feedbacks = await Feedback.find()
        if (feedbacks){
            for( const feedback of feedbacks){
                reviewed.add(feedback.stationId.toString())
            }
        }
        let arr1=[...allStns]
        let arr2=[...reviewed]
        console.log(allStns.size)
        console.log(reviewed.size)
        let unreviewedStnsArr = arr1.filter(item=>!arr2.includes(item))
        console.log(unreviewedStnsArr.length)
        let jsonString = JSON.stringify(unreviewedStnsArr, null, 2); // The third argument (2) is for indentation

        // Write the JSON string to a file
        fs.writeFileSync('unreviewdStns.json', jsonString);

        console.log('Array successfully converted to JSON file.');
        return NextResponse.json({ message: unreviewedStnsArr.length})
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
        const Feedbacks = await Feedback.find()
        for (const Station of unreviewedStns) {
            for(let i=0; i<10;i++){
                const startDate = new Date('2023-10-01');
                const endDate = new Date('2023-10-25');
                const randomDate = getRandomDate(startDate, endDate);
                const feedback = getRandomString(Feedbacks)
                feedback.stationId = Station
                feedback.createdAt = randomDate
                feedback.attachment = ""
                const newFeedback = await Feedback.create({ description: feedback.description, issue: feedback.issue, attachment: feedback.attachment, id: feedback.id, stationId: feedback.stationId, type: feedback.type, createdAt: feedback.createdAt })
                console.log(newFeedback._id)
            }
        }
        return NextResponse.json({ success: "created" })

    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

function getRandomDate(startDate, endDate) {
    // Convert the dates to timestamps
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    // Calculate a random timestamp within the range
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);

    // Convert the timestamp back to a date
    const randomDate = new Date(randomTimestamp);

    return randomDate;
}

export async function PUT(req, res) {
    try {
        const db = await connect()
        // const body = await req.json()
        // const feedbacks = await Feedback.find()
        
        return NextResponse.json({ success: true })

    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
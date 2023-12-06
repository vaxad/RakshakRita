import { NextResponse } from "next/server";
import connect from "../../../lib/db/connection";
import Heatmap from "../../../lib/db/models/Heatmap";

export async function POST(req, res) {
    try {
        const db = await connect()
        const body = await req.json()
        for (const item of body.heatmapData) {
            console.log(item)
            const hmOld = await Heatmap.findOne({latitude:item[0],longitude:item[1]})
            if(hmOld){
                hmOld.intensity = item[2]
                await hmOld.save()
            }else{
                const hm = await Heatmap.create({latitude:item[0],longitude:item[1],intensity:item[2]})
            }
        }
        
        return NextResponse.json({ success: true })

    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}

export async function PUT(req, res) {
    try {
        const db = await connect()
        const body = await req.json()
        for (const item of body.heatmapData) {
            
            const hm = await Heatmap.findOne({latitude:item[0],longitude:item[1]})
            hm.intensity = item[2]
            await hm.save()
        }
        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
export async function GET(req, res) {
    try {
        const db = await connect()
        const hmData = await Heatmap.find()
        
        return NextResponse.json({ heatmapData: hmData })

    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
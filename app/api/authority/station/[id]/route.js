import connect from "../../../../../lib/db/connection"
import Stations from "../../../../../lib/db/models/Stations"
import { NextResponse } from "next/server"

export async function GET(req,context){
    try {
        console.log(context.params.id)
        const stationId = context.params.id
        const db = await connect()
        const station = await Stations.findById(stationId)
        console.log(station)
        return NextResponse.json({station:station})
    } catch (error) {
        return NextResponse.json({error:error})
    }
}
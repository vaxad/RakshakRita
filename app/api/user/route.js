import connect from "../../../lib/db/connection"
import Citizen from "../../../lib/db/models/Citizen"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const db = await connect()
        const createdUser = await Citizen.create({ createdAt: Date.now() })
        return NextResponse.json({ user: createdUser })
    } catch (err) {
        console.log(err)
        return NextResponse.json(err.message)
    }
}
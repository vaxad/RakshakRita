
import { NextResponse } from "next/server";
import qrcode from 'qrcode';
import axios from "axios";
import connect from "../../../lib/db/connection";
import Stations from "../../../lib/db/models/Stations";

export async function POST(req) {
    try {
        
        const db = await connect()
        
        let bodyObject = await req.json();
        
        let myPost = await Stations.create({ "name": bodyObject.name, "latitudes": bodyObject.latitudes, "longitudes":bodyObject.longitudes, "qr":"","state":bodyObject.state, "taluka":bodyObject.taluka, "district":bodyObject.district, "village":bodyObject.village });
        console.log(myPost)
        const qrData = process.env.DOMAIN+"/feedback/"+myPost._id
        console.log(qrData)
        
        qrcode.toDataURL(qrData, async (err, url) => {
            if (err) {
                console.error(err);
                return NextResponse.json("not ok")

            } else {
                const upload_preset = process.env.UPLOAD_PRESET
                const cloudinaryLink = process.env.CLOUDINARY_LINK
                const formData = new FormData();
                formData.append('file', url);
                formData.append('upload_preset', upload_preset);
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudinaryLink}/image/upload`,
                    formData
                );

                if (response.statusText === "OK") {
                    
                    myPost.qr = response.data.url
                    myPost.save()
                } else {
                    return NextResponse.json("not ok")

                }
            }
        });
        return NextResponse.json("ok")
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}

export async function GET(req){
    try {
        const db = await connect()
        const stations = await Stations.find()
        return NextResponse.json({stations:stations})
    } catch (error) {
        return NextResponse.json({error:error})
    }
}




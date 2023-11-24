// import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import qrcode from 'qrcode';
import axios from "axios";
import connect from "../../../lib/db/connection";
import Stations from "../../../lib/db/models/Stations";

export async function POST(req) {
    try {
        // const client = await clientPromise;
        const db = await connect()
        //    console.log(db)
        let bodyObject = await req.json();
        
        let myPost = await Stations.create({ "name": bodyObject.name, "latitudes": bodyObject.latitudes, "longitudes":bodyObject.longitudes, "qr":"","state":bodyObject.state, "taluka":bodyObject.taluka, "district":bodyObject.district, "village":bodyObject.village });
        console.log(myPost)
        const qrData = process.env.DOMAIN+"/feedback/"+myPost._id
        console.log(qrData)
        // Generate a QR code from the JSON string
        qrcode.toDataURL(qrData, async (err, url) => {
            if (err) {
                console.error(err);
                return NextResponse.json("not ok")

            } else {
                // Upload the QR code to Cloudinary

                const formData = new FormData();
                formData.append('file', url);
                formData.append('upload_preset', 'gcdc_test');
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/db670bhmc/image/upload',
                    formData
                );

                //.log(response.statusText);
                if (response.statusText === "OK") {
                    // let myPost = await Stations.create({ "name": bodyObject.name, "loc": bodyObject.loc, "img": response.data.url });
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
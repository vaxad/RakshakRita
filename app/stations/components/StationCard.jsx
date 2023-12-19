"use client"
import Link from "next/link";
import 'react-circular-progressbar/dist/styles.css';
import Percent from "./Percent";
import { useRouter } from "next/navigation";

export default function StationCard({ el }) {
    const router = useRouter()
    console.log(el._id)
    const id = ("/feedback/"+el._id.$oid).toString();
    return (
        <div className="stationCard  lg:col-span-1 md:col-span-2 col-span-3 w-full">
            <div className="cardContents">
                <div className="imageWithProgress relative">
                    <img src="/station.png" style={{ width: "100%" }} alt="" />
                    <Percent id={el._id.$oid} />
                </div>

                <div className="stationDetails">
                    <p className="stationsSubtitle font-semibold">{el.name}</p>
                    <p className="addy">ADDRESS:</p>
                    <p>{`${el.area}, ${el.district}, ${el.state}, ${el.pincode}`}</p>
                    <a target="_blank" className=" underline decoration-red-300  hover:text-black hover:decoration-red-600" href={`https://www.google.com/maps/place/${el.latitude},${el.longitude}`}>View on maps</a>
                </div>
                <div className=" flex w-full justify-center items-center">
                    <button onClick={()=>{
                        console.log(typeof(id))
                        router.push(id)
                    }} className="feedbackBtn bg-orange-500 flex justify-center items-center hover:scale-105 px-4 py-3 font-medium text-2xl text-slate-50 rounded-xl transition-all w-4/5  "> Give Feedback </button>
                </div>
            </div>
        </div>
    )
}

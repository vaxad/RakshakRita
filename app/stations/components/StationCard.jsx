import Link from "next/link";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function StationCard({el}) {
    const percentage = 66;
  return (
    <div className="stationCard">
            <div className="cardContents">
                <div className="imageWithProgress relative">
                    <img src="/station.png" style={{width:"100%"}} alt=""/>
                    <div className=" absolute -bottom-5 -right-2 w-16 bg-slate-50 p-1 rounded-full">
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
                    pathColor:"#d44444",
                    textColor:"#d44444",
                })}/>
                </div>
                </div>
                
                <div className="stationDetails">
                    <p className="stationsSubtitle font-semibold">{el.name}</p>
                    <p className="addy">ADDRESS:</p>
                    <p>{`${el.area}, ${el.district}, ${el.state}, ${el.pincode}`}</p>
                    <a target="_blank" className=" underline decoration-red-300  hover:text-black hover:decoration-red-600" href={`https://www.google.com/maps/place/${el.latitude},${el.longitude}`}>View on maps</a>
                </div>
                <div className=" flex w-full justify-center items-center">
                <Link href={`/feedback/${el._id}`} className=" bg-orange-500 flex justify-center items-center hover:scale-105 px-4 py-3 font-medium text-2xl text-slate-50 rounded-xl transition-all w-4/5  "> Give Feedback </Link>
            </div>
            </div>
        </div>
  )
}

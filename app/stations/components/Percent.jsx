"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function Percent({id}) {
    const [data, setdata] = useState(null)
    const [percent, setpercent] = useState(0)
    console.log(id)
    let p=0,n=0,neu=0;
    useEffect(() => {
      const getData = async () => {
        const resp = (await axios.post(`/api/authority/feedback`, JSON.stringify({stationId:id}))).data
        console.log(resp)
        const result = resp.feedbacks;
        result.forEach(element => {
            console.log(element)
            if(element.type.includes("Positive")){
                p++;
            }else if(element.type.includes("Negative")){
                n++;
            }else{
                neu++;
            }
        });
        setpercent(parseInt(n/(p+n)*100))
      }
      getData();
    }, [])

    
  return (
    <div className=" absolute -bottom-5 -right-2 w-16 bg-slate-50 p-1 rounded-full">
                <CircularProgressbar value={percent} text={`${percent}%`} styles={buildStyles({
                    pathColor:"#d44444",
                    textColor:"#d44444",
                })}/>
                </div>
  )
}

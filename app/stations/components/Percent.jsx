"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function Percent({ id }) {
  const [data, setdata] = useState(null)
  const [percent, setpercent] = useState(0)
  const [color, setcolor] = useState("#76BA1B")


  let p = 0, n = 0, neu = 0;
  useEffect(() => {
    const getData = async () => {
      const resp = (await axios.post(`/api/authority/feedback`, JSON.stringify({ stationId: id }))).data

      const result = resp.feedbacks;
      result.forEach(element => {
        console.log(element)
        if (element.type)
          if (element.type.includes("Positive")) {
            p++;
          } else if (element.type.includes("Negative")) {
            n++;
          } else {
            neu++;
          }
      });
      setpercent(parseInt(n / (p + n) * 100))
      if (parseInt(n / (p + n) * 100) > 40 && parseInt(n / (p + n) * 100) <= 60) {
        setcolor("#FFBF00")
      } else if (parseInt(n / (p + n) * 100) > 60) {
        setcolor("#d44444")
      }
    }
    getData();
  }, [])


  return (
    <div className=" absolute -bottom-5 -right-2 w-16 bg-slate-50 p-1 rounded-full">
      <CircularProgressbar value={percent} text={`${percent}%`} styles={buildStyles({
        pathColor: color,
        textColor: color,
      })} />
    </div>
  )
}

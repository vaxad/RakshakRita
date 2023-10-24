"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import StationCard from "./components/StationCard"

export default function Page() {
    const [stations, setstations] = useState([])
    useEffect(() => {
      const getData = async () => {
        const resp = (await axios.get("/api/station"))
        setstations(resp.data.stations)
        console.log(resp.data)
      }
      getData()
    }, [])

    useEffect(() => {
      console.log(stations)
    }, [stations])
    
  return (
    <div className=" flex flex-col justify-center items-center gap-4 py-24 w-full max-w-[100vw]">
        {stations.length!==0?
        stations.map((station) => {
            return(
            <StationCard key={station._id} station={station}/>
            )
        }):<></>}
    </div>
  )
}

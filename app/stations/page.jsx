"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import StationCard from "./components/StationCard";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

export default function Stations() {
    const [stations, setstations] = useState([])
    useEffect(() => {
      const getData = async() => {
        const resp = (await axios.get("/api/station")).data
        setstations(resp.stations.slice(1,15))
      }
      getData();
    }, [])
    
  return (
    <main className="flex flex-col w-full home min-h-[100vh] ">
    <Navbar/>

    <div className=" flex flex-col w-full ">

        <div className="filter flex flex-row flex-nowrap text-black w-full my-6 px-12 gap-5">
            <input type="text" className=" w-full py-3 px-6 border border-slate-400 rounded-2xl" placeholder="Search a Police Station..."></input>
        <form className=" flex flex-col justify-start max-w-fit">
            {/* <label>Filter by</label> */}
            <select>
              <option className=" text-slate-300">Filter</option>
              <option>District</option>
              <option>THIS</option>
              <option>SHIT</option>
              <option>HARD</option>
            </select>
        </form>
    </div>
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-12 md:px-12 px-4 pb-16 gap-6 w-full">
    {stations.length===0?
    (<div className=" col-span-3 w-full min-h-[50vh]"><Loading/></div>):
    stations.map((el)=>{
        return(
            <StationCard key={el._id} el={el}/>
        )
    })}
    </div>
    </div>
  </main>
  )
}

"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import StationCard from "./components/StationCard";
import Loading from "../components/Loading";

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
    <div className="navbar bg-opacity-60 bg-slate-950 w-full h-full">
      <div className="head w-full">
          <div className="logo">
              <h1 className="txtOrange title">Rakshakરીત</h1>
              <p className="subtitle">Your Voice, Our Commitment</p>
          </div>

          <div className="searchbar"></div>

          <div className="options">
              <div className="language txtOrange"><span>ENGLISH</span><div className="dropdown"></div></div>
              <div className="log-sign-div">
                  <button className="log-sign-button login bgOrange"> Login </button>
                  <button className="log-sign-button signup bgOrange"> Signup </button>
              </div>
          </div>
      </div>

      <div className="navbarOptions text-slate-100">
          <div><a href="/complain" className="navLinks">Submit a feedback</a></div>
          <div><a href="" className="navLinks">How it works</a></div>
          <div><Link href="/stations" className="navLinks">Police stations</Link></div>
          <div><a href="" className="navLinks">Feedback history</a></div>
          <div><a href="" className="navLinks">About us</a></div>
          <div><a href="" className="navLinks">Contact us</a></div>
      </div>
  </div>

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
    <div className=" grid grid-cols-3 px-12 pb-16 gap-6 w-full">
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

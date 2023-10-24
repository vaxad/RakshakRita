"use client"
import { useState } from "react"

export default function Home() {
  const [name, setname] = useState("")
  const [loc, setloc] = useState("")
  const [state, setstate] = useState("")
  const [district, setdistrict] = useState("")
  const [taluka, settaluka] = useState("")
  const [village, setvillage] = useState("")

  const handleSubmit = async (e) => {
    const inp = JSON.stringify({ "name": name, "latitudes": loc.split(",")[0], "longitudes": loc.split(",")[1], "state":state, "district": district, "taluka":taluka, "village":village })
    console.log(inp)
    e.preventDefault();
    const resp = await fetch("/api/station", {
      method: "POST",
      body: inp
    })
    const data = await resp.json()
    console.log(data)
    setloc("")
    setname("")
    setdistrict("")
    setstate("")
    settaluka("")
    setvillage("")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className=" flex flex-col justify-center items-center w-full">
        <h1 className=" text-xl font-bold ">GoodCopBadCop</h1>
        <form onSubmit={(e) => handleSubmit(e)} className=" flex flex-col justify-center items-center w-full gap-3 py-6">
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">name of police station</h2>
            <input type="text" className="p-3 rounded-lg text-black" value={name} onChange={(e) => setname(e.target.value)}></input>
          </div>
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">state of police station</h2>
            <input type="text" className="p-3 rounded-lg text-black" value={state} onChange={(e) => setstate(e.target.value)}></input>
          </div>
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">district of police station</h2>
            <input type="text" className="p-3 rounded-lg text-black" value={district} onChange={(e) => setdistrict(e.target.value)}></input>
          </div>
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">taluka of police station</h2>
            <input type="text" className="p-3 rounded-lg text-black" value={taluka} onChange={(e) => settaluka(e.target.value)}></input>
          </div>
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">village of police station</h2>
            <input type="text" className="p-3 rounded-lg text-black" value={village} onChange={(e) => setvillage(e.target.value)}></input>
          </div>
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">coordinates of police station</h2>
            <input type="text" className="p-3 rounded-lg text-black" value={loc} onChange={(e) => setloc(e.target.value)}></input>
          </div>
          <button type="submit" className=" px-4 py-2 mx-5 font-bold bg-blue-500 rounded-lg">Submit</button>
        </form>
        <a href="/complain" className=" px-4 py-2 mx-5 font-bold bg-blue-500 rounded-lg">Complain</a>
        <a href="/feedbacks" className=" px-4 py-2 mx-5 font-bold bg-blue-500 rounded-lg">Feedbacks</a>

      </div>
    </main>
  )
}

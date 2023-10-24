"use client"

export default function StationCard({station}) {
  return (
    <div className=" flex flex-col w-full gap-3 p-5 bg-orange-400 rounded-lg">
        <h1 className=" text-2xl font-bold">{station.name}</h1>
        <hr className=" w-full"></hr>
    </div>
  )
}

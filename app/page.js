import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col w-full home min-h-[100vh]">
      <Navbar/>

    <div className="flex lg:flex-row flex-col justify-center items-center gap-12 w-full max-w-[100vw] text-slate-950 z-50 min-h-[80vh] h-full py-16">
        <div className="flex flex-col justify-center items-center w-full lg:px-12 px-6">
            <h1 className=" lg:text-6xl text-2xl md:text-6xl flex-wrap font-extrabold z-50">Report.Evaluate.Improve</h1>
            <div className="flex flex-col py-6 subtitle lg:text-2xl text-xl">
                <div>Help us make your community safer.</div>
                <div>Share your feedback with your local police station.</div>
            </div>
            <Link href={"/complain"} className=" px-5 py-2 rounded-xl bg-orange-500 lg:text-3xl text-xl hover:text-slate-50 hover:scale-105 font-bold transition-all">GET STARTED</Link>
        </div>

        <div className=" w-full flex justify-center items-center lg:justify-start  lg:w-3/5">
            <img width={250} className="max-w-[90vw] " src="/phone.png" alt=""/>
        </div>
    </div>
    </main>
  )
}

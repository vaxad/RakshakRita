import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col w-full home min-h-[100vh]">
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

    <div className="flex flex-row justify-center items-center gap-12 w-full text-slate-950 z-50 min-h-[80vh]">
        <div className="flex flex-col justify-center items-center">
            <h1 className=" text-6xl font-extrabold z-50">Report.Evaluate.Improve</h1>
            <div className="flex flex-col py-6 subtitle">
                <div>Help us make your community safer.</div>
                <div>Share your feedback with your local police station.</div>
            </div>
            <button className=" px-5 py-2 rounded-xl bg-orange-500 text-3xl font-bold transition-all">GET STARTED</button>
        </div>

        <div className="">
            <img src="/phone.png" alt=""/>
        </div>
    </div>
    </main>
  )
}

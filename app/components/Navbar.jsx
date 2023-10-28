import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className="flex flex-col gap-5 py-6  bg-opacity-60 bg-slate-950 w-full max-w-[100vw] rounded-b-2xl h-full">
        <div className=" flex flex-row justify-between items-center lg:px-16 px-5 w-full">
            <Link href={"/"} className="logo cursor-pointer">
                <h1 className="txtOrange font-bold lg:text-4xl text-2xl">Rakshakરીત</h1>
                <p className="subtitle lg:flex hidden">Your Voice, Our Commitment</p>
            </Link>

            <div className="searchbar"></div>

            <div className="options">
                <div className="language txtOrange cursor-pointer"><span>ENGLISH</span><div className="dropdown"></div></div>
                {/* <div className="log-sign-div">
                    <button className="log-sign-button login bgOrange"> Login </button>
                    <button className="log-sign-button signup bgOrange"> Signup </button>
                </div> */}
            </div>
        </div>

        <div className="flex-row justify-around items-center  lg:flex hidden text-slate-100 ">
            <div><Link href="/complain" className="navLinks transition-all">Submit a feedback</Link></div>
            <div><a href="" className="navLinks transition-all">How it works</a></div>
            <div><Link href="/stations" className="navLinks transition-all">Police stations</Link></div>
            {/* <div><a href="" className="navLinks transition-all">Feedback history</a></div> */}
            <div><a href="" className="navLinks transition-all">About us</a></div>
            <div><a href="" className="navLinks transition-all">Contact us</a></div>
        </div>
    </div>
  )
}

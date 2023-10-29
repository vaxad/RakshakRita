"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    const [nav, setnav] = useState(false)
  return (
    <div className="flex flex-col gap-5 py-6  bg-opacity-60 bg-slate-950 w-full max-w-[100vw] rounded-b-2xl h-full">
        <div className=" flex flex-row justify-between items-center lg:px-16 px-5 w-full ">
            <Link href={"/"} className="logo cursor-pointer">
                <h1 className="txtOrange font-bold lg:text-4xl text-2xl">Rakshakરીત</h1>
                <p className="subtitle lg:flex hidden">Your Voice, Our Commitment</p>
            </Link>

            <div className="searchbar"></div>

            <div className="options">
                <div className="language txtOrange cursor-pointer  hover:text-orange-600"><span>ENGLISH</span><div className=" dropdown"></div></div>
                <svg onClick={()=>{setnav(true)}} xmlns="http://www.w3.org/2000/svg" className=' text-[#FF9400] hover:text-orange-600 transition-all lg:hidden block' fill='currentColor' x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
<path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
</svg>
                {/* <div className="log-sign-div">
                    <button className="log-sign-button login bgOrange"> Login </button>
                    <button className="log-sign-button signup bgOrange"> Signup </button>
                </div> */}
            </div>

            

            
        </div>

        <div className="flex-row justify-around items-center lg:flex hidden text-slate-100 ">
            <div><Link href="/complain" className="navLinks transition-all">Submit a feedback</Link></div>
            <div><a href="" className="navLinks transition-all">How it works</a></div>
            <div><Link href="/stations" className="navLinks transition-all">Police stations</Link></div>
            {/* <div><a href="" className="navLinks transition-all">Feedback history</a></div> */}
            <div><a href="" className="navLinks transition-all">About us</a></div>
            <div><a href="" className="navLinks transition-all">Contact us</a></div>
        </div>
        
        <div className={`flex-col justify-center gap-12 bg-slate-800 min-h-[100vh] fixed  top-0 right-0 ${nav?" translate-y-0":" -translate-y-full"} transition-all items-center lg:hidden flex w-full text-slate-100 z-50 `} style={{transitionDuration:"1000ms", transitionDelay:"200ms"}}>
        <div onClick={()=>{setnav(false)}} className=" absolute top-5 right-5 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className=' text-[#FF9400] hover:text-orange-600 transition-all lg:hidden block' fill='currentColor' x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
</svg></div>
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

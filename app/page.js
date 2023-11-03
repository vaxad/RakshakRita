import Link from "next/link";
import Navbar from "./components/Navbar";
import Phone from "./components/Phone";
import Blob1 from "./components/Blob1";
import Blob2 from "./components/Blob2";

export default function Home() {
  return (
    <main className="flex flex-col w-full home min-h-[100vh]">
      <div class="area z-10" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
      <Navbar/>
    <div className="flex lg:flex-row flex-col justify-center items-center gap-12 w-full max-w-[100vw] text-slate-950 z-20 min-h-[80vh] h-full py-16">
        <div className="flex flex-col justify-center items-center w-full ">
          <div className=" flex flex-col justify-center items-center lg:px-12 px-6 py-12 border-2 border-[#454545] rounded-2xl">
            {/* <h1 className=" lg:text-6xl text-2xl md:text-6xl flex-wrap font-extrabold z-20">Report.Evaluate.Improve</h1> */}
            <Blob2/>
            <div class="content">
  <div class="content__container lg:text-6xl text-3xl md:text-6xl flex-wrap font-extrabold z-20 text-[#262c69]">
    <p class="content__container__text">
      We
    </p>
    
    <ul class="content__container__list">
      <li class="content__container__list__item">Report !</li>
      <li class="content__container__list__item">Evaluate !</li>
      <li class="content__container__list__item">Improve !</li>
      <li class="content__container__list__item">Protect !</li>
    </ul>
  </div>
</div>
            <div className="flex flex-col py-6 subtitle lg:text-2xl text-xl text-[#262c69]">
            {/*<h1 className="title">
                 Learning redefined <br /> with <br/> 
                <span className="header-caption">
                    <span className="cd-headline rotate-1">
                      <span className="cd-words-wrapper">
                        <b className="is-visible theme-gradient">AI mentors</b>
                        <b className="is-hidden theme-gradient">Cloud labs</b>
                        <b className="is-hidden theme-gradient">Premium guidance</b>
                        <b className="is-hidden theme-gradient">Zenith+ Community</b>
                      </span>
                    </span>
                </span>
              </h1> */}
                <p>Help us make your community safer.</p>
                <p>Share your feedback with your local police station.</p>
            </div>
            <Link href={"/complain"} className=" px-5 py-2 rounded-full bg-[#F86F03] bg-opacity-50 hover:bg-opacity-100 lg:text-4xl text-[#E1EEDD] text-2xl hover:text-[#262c69] hover:scale-105 font-bold transition-all">GET STARTED</Link>
        </div>
        </div>

        <div className=" w-full flex justify-center items-center lg:justify-start  lg:w-3/5">
          <Phone/>
        </div>
    </div>
    </main>
  )
}

"use client"
import React from "react";
import { motion } from "framer-motion";

function Card({ index, title, description, img }) {
    const xmov = index%2===0?-50:50;
  return (
    <motion.div initial={"hidden"} whileInView="visible" transition={{ duration: 1, ease: 'easeOut' }}
      variants={{
        visible: { opacity: 1, x:0 },
        hidden: { opacity: 0, x:xmov }
      }} className={`flex flex-col lg:flex-row w-full lg:w-4/5 ${index % 2 === 0 ? "justify-start items-start text-start" : " justify-end items-end text-end"} ${index%2!==0?"bg-gradient-to-bl":"bg-gradient-to-tr"} from-[#3e77b6] to-[#7bb4e3] shadow border-gray-700 hover:bg-gray-700 p-5 rounded-md gap-5`} >
      {index % 2 !== 0 && <div className=" rounded-full bg-slate-50 p-5 "><img width={96} height={96} src={img} /></div>}
      <div className={`flex flex-col w-full ${index % 2 == 0 ? "justify-start items-start text-start" : " justify-end items-end text-end"} `}>
        <h1 className=" pb-2  text-lg base:text-xl lg:text-2xl font-extrabold  flex justify-center items-center ">
          {title}
        </h1>
        <p className="text-md sm:text-xl w-full lg:w-2/3 text-slate-800">{description}</p>
      </div>
      {index % 2 === 0 && <div className=" rounded-full bg-slate-50 p-5 "><img width={96} height={96} src={img} /></div>}

    </motion.div>
  );
}

export default Card;

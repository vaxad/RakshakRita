"use client"
import React from 'react'
import { motion } from "framer-motion";


export default function Phone() {
  return (
    <motion.div  initial={{opacity:0}}
    animate={{ opacity:1 }} transition = {{ duration : 2}}>
    <motion.img initial={{y:50}}
    animate={{ y:-50 }}
    transition={{ repeat: Infinity, repeatType:"reverse", duration: 4 }}  width={250} className="max-w-[90vw] z-20 " src="/phone.png" alt=""/>
    </motion.div>
  )
}

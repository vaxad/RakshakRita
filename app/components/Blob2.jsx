"use client"
import React from 'react'
import { motion } from "framer-motion";
export default function Blob2() {
  return (
    <motion.div initial={{y:60}}
    animate={{ y:-40 }}
    transition={{ repeat: Infinity, repeatType:"reverse", duration: 3.7 }} className=" absolute hidden lg:block top-64 right-64 ">
      <div className=' gooey'></div>
    </motion.div>
    
  )
}

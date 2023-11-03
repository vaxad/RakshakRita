"use client"
import React from 'react'
import { motion } from "framer-motion";
export default function Blob1() {
  return (
    <motion.div initial={{y:60}}
    animate={{ y:-40 }}
    transition={{ repeat: Infinity, repeatType:"reverse", duration: 3.7 }} className=" blob1 hidden lg:block absolute top-64 right-64 "></motion.div>
    
  )
}

"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

export default function SendMail() {
        
    var ctr = 0
    useEffect(() => {
        const sendMail = async () => {
            const sendRes = await axios.put("/api/mail")
            if (!sendRes.data.send) {
                console.log("Mail sending")
                const htmlData = (await axios.post("https://rakshakrita-api-v2.onrender.com/mail")).data
                const html = htmlData.html.join(" ")
                // console.log(html)
                const resp = (await axios.post("/api/mail", JSON.stringify({ html: html }))).data
                console.log(resp)
            } else {
                console.log("not sending")
            }
        }
        console.log("useEffect")
        if (ctr === 0) {
            ctr++;
            sendMail()
        }
    }, [])

    return (
        <div></div>
    )
}

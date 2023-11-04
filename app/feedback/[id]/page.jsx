"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./feedback.css"
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

export default function Page({ params: { id } }) {
  const [station, setStation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sub, setSub] = useState(null)
  const [desc, setDesc] = useState("")
  const [uid, setId] = useState(null)
  const [file, setFile] = useState(null);
  const [img, setimg] = useState(null)
  const [attatch, setAttatch] = useState(null)
  const imageUpload = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const cloud_name = "db670bhmc"
  const [address, setAddress] = useState(null);
  const route = useRouter();

  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      const resp = (await axios.get("/api/user")).data;
      console.log(resp);
      setId(resp.user._id);
    } else {
      console.log(userId)
      setId(userId)
    }
  }


  useEffect(() => {
    try {
      getUser()
    } catch (error) {
      console.trace(error);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setimg(URL.createObjectURL(e.target.files[0]));
  };


  const getData = async () => {
    const res = await fetch(`/api/station/${id}`, {
      method: "GET",
    });
    const data = await res.json()
    setStation(data.station)
    setLoading(false)
    // console.log(data)
  }
  useEffect(() => {
    getData()
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    if (window)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            // return ({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          },
          (err) => {
            alert(err.message);
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
  }

  function areCoordinatesClose(coord1, coord2, threshold) {
    if (!coord1 || !coord2) {
      console.log("no coord")
      return false
    }
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers

    const lat1 = toRadians(coord1.latitude);
    const lon1 = toRadians(coord1.longitude);
    const lat2 = toRadians(coord2.latitude);
    const lon2 = toRadians(coord2.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c * 1000; // Convert to meters

    return distance < threshold;
  }

  const checkProximity = () => {
    const c1 = { latitude: station.latitudes, longitude: station.longitudes }
    const c2 = { latitude: latitude, longitude: longitude }
    if (!c2.latitude || !c2.longitude)
      return false
    const threshold = 100
    return areCoordinatesClose(c1, c2, threshold)
  }

  const handleSubmit = async () => {
    setLoading(true)
    if (!desc) {
      alert("Please enter a description")
      return
    }
    if (checkProximity()) {
      alert("you need to in the 100m range of " + station?.name)
    } else {
      const response = await axios.post("https://rakshakrita-api.onrender.com/type", { "text": desc })
      const typeData = await response.data
      console.log(typeData)
      const response2 = await axios.post("https://rakshakrita-api.onrender.com/issue", { "text": desc })
      const issueData = await response2.data
      console.log(issueData)
      if (!!file) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'gcdc_test');
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
            formData
          );
          console.log(response)
          //.log(response.statusText);
          if (response.statusText === "OK") {
            console.log(response.data.url)
            setAttatch(response.data.url)
            const resp = (await axios.post("/api/feedback", JSON.stringify({ description: desc, attatchment: response.data.url, id: uid, stationId: station._id, type: typeData.type, issue: issueData.issue[0] }))).data
            if (resp.message) {
              alert(resp.message)
            } else {
              setDesc("")
              setimg(null)
              setFile(null)
            }
            console.log(resp)
          }
        } catch (error) {
          console.error('Error uploading file to Cloudinary:', error);
        }
      } else {
        const resp = (await axios.post("/api/feedback", JSON.stringify({ description: desc, subject: sub, attatchment: "", id: uid, stationId: station._id, type: typeData.type, issue: issueData.issue[0] }))).data
        console.log(resp)
        if (resp.message) {
          alert(resp.message)
        } else {
          setSub("")
          setDesc("")
          setimg(null)
          setFile(null)
          route.push("/stations")
        }
      }
    }
    setLoading(false)
  }

  return (
    <main className="flex flex-col w-full home min-h-[100vh] overflow-x-hidden">
      <Navbar />
      {loading ? <Loading /> : <div className="formContainer py-12 w-full px-3">
        <div className="formTitle darkColor w-full">
          <div className="heading">
            <h1>Submit Your Feedback</h1>
            <p className="lightColor">This feedback is the cornerstone upon which we build a safer, more responsive, and community-centric policing system</p>
          </div>
          <h1 className="policeStaion">{station?.name}</h1>
        </div>

        <div className="form w-full">
          {/* <div className="subject w-full lg:w-2/3 transition-all">
            <label>Subject</label>
            <input placeholder="Enter the subject of your feedback" className="textFields text-slate-950 placeholder:text-slate-600" type="text" id="subject" value={sub} onChange={(e) => setSub(e.target.value)} />
          </div> */}
          <div className="description w-full lg:w-2/3 transition-all">
            <label>Description</label>
            <textarea className="textFields text-slate-950 placeholder:text-slate-600" id="descriptionField" cols="30" rows="10" placeholder="Describe your case..." value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>
        </div>
        <div onClick={() => { imageUpload.current.click() }} className=" flex flex-row gap-4 justify-center py-6 items-center">
          <p className=" text-xl font-semibold text-slate-950 p-5 transition-all hover:text-slate-50 cursor-pointer hover:bg-orange-400 rounded-xl">Add Attatchment</p>
          <img width={60} height={60} src="/add-image.png" alt="" />
        </div>
        <input type="file" ref={imageUpload} className=" hidden p-3 rounded-lg text-black w-full" onChange={handleFileChange}></input>
        <div className=" flex w-full justify-center items-center">
          {(file?.type.includes("image")) ? <img className=' py-10' src={img}></img>
            : (file?.type.includes("video")) ? <video className=' py-10' src={img}></video> :
              <></>}
        </div>
        <button onClick={() => { handleSubmit() }} className="font-bold text-2xl p-5 transition-all bg-gradient-to-tr from-[#f1d81a] to-[#ff7300] rounded-2xl text-slate-50 ">Submit</button>
      </div>}
    </main>
  )
}

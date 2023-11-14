"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./feedback.css"
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import L from 'leaflet';
import Field from "@/app/components/Field";
import Dictaphone from "./components/Dictaphone";

export default function Page({ params: { id } }) {
  const [station, setStation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sub, setSub] = useState(null)
  const [desc, setDesc] = useState("")
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [file, setFile] = useState(null);
  const [img, setimg] = useState(null)
  const [dept, setdept] = useState([])
  const [attatch, setAttatch] = useState(null)
  const imageUpload = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const cloud_name = "db670bhmc"
  const [address, setAddress] = useState(null);
  const route = useRouter();
  const [extra, setextra] = useState(null)

  useEffect(() => {
    try {
      const getInitialData = async () => {
        // const res = await fetch(`https://ipapi.co/json/`);
        // const data = await res.json();
        const res = await fetch("/api/authority/form")
        const data = await res.json()
        setextra(data.form)
        // setAddress(data);
      };
      getInitialData();
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
    const latitude = 21.170240     //temp
    const longitude = 72.831062    //temp
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
      const response = await axios.post("https://rakshakrita-api.onrender.com/type", { "text": sub + ": " + desc })
      const typeData = await response.data
      console.log(typeData)
      const response2 = await axios.post("https://rakshakrita-api.onrender.com/issue", { "text": sub + ": " + desc })
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
            const resp = (await axios.post("/api/feedback", JSON.stringify({ description: desc, attatchment: response.data.url, ip: address?.ip, stationId: station._id, type: typeData.type, issue: issueData.issue[0] }))).data
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
        const resp = (await axios.post("/api/feedback", JSON.stringify({ description: desc, subject: sub, attatchment: "", ip: address?.ip, stationId: station._id, type: typeData.type, issue: issueData.issue[0] }))).data
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
  const setMap = () => {
    var container = L.DomUtil.get('map');

    if (container != null) {

      container._leaflet_id = null;

    }
    console.log("hello")
    const start = [parseFloat(station.latitude), parseFloat(station.longitude)]
    const latitude = 21.170240     //temp
    const longitude = 72.831062    //temp
    const end = [parseFloat(latitude), parseFloat(longitude)]
    var map = L.map('map').setView(start, 50);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var circle = L.circle(start, {
      color: 'green',
      fillColor: '#0f0',
      fillOpacity: 0.5,
      radius: 100
  }).addTo(map);
  var customIcon = L.icon({
    iconUrl: '/police-station.png',
    iconSize: [32, 32], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point
    popupAnchor: [0, -32], // set the popup anchor
  });

  var customIcon2 = L.icon({
    iconUrl: '/location.png',
    iconSize: [32, 32], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point
    popupAnchor: [0, -32], // set the popup anchor
  });
    L.marker(start,{ icon: customIcon }).addTo(map);
    L.marker(end, { icon: customIcon2 }).addTo(map);
    var line = L.polyline([start, end], { color: 'red' }).addTo(map);
    map.fitBounds(line.getBounds());

  }

  useEffect(() => {
    if (station?.latitude&&latitude) {
      var container = L.DomUtil.get('map');

      if (container != null) {

        container._leaflet_id = null;

      }
      setMap()
      // console.log("hello")
      // var map = L.map('map').setView([parseFloat(station.latitude), parseFloat(station.longitude)], 50);
      // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   maxZoom: 19,
      //   // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // }).addTo(map);
      // L.marker([parseFloat(station.latitude), parseFloat(station.longitude)]).addTo(map);

    }
  }, [station, latitude])

  const addAudioElement = (blob) => {
    convertToBase64AndSend(blob);
  };

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }

  const convertToBase64AndSend = (audioBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
        const base64data = reader.result ;
        console.log(base64data);
    }
} 

const [more, setmore] = useState(false)
  return (
    <main className="flex flex-col w-full home min-h-[100vh] overflow-x-hidden">
      <Navbar />
      {loading ? <Loading /> : <div className="formContainer py-12 w-full px-3 justify-center items-center flex flex-col">
        <div className=" darkColor w-full">
          <div className="heading">
            <h1 className="text-[#262c69]">Submit Your Feedback</h1>
            <p className="lightColor">This feedback is the cornerstone upon which we build a safer, more responsive, and community-centric policing system</p>
          </div>
          <h1 className="">{station?.name}</h1>
        </div>
        <div className=" flex w-full justify-center items-center">
          {station?.latitude && <div id="map" className=" z-10 w-2/3 rounded-xl my-8" style={{ height: "40vh" }}></div>}
        </div>
        <div className="form w-full">
          
    <Dictaphone setDesc={setDesc}/>
        <div className="description w-full lg:w-2/3 transition-all">
            <div className="label">Description</div>
            <textarea className="textFields text-slate-950 placeholder:text-slate-600" id="descriptionField" cols="30" rows="10" placeholder="Describe your case by typing or use speech recognition" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>

{!more&&<button className=" py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all" onClick={()=>{setmore(true)}}> view more</button>}
          { more&&<><div className="subject w-full lg:w-2/3 transition-all">
            <div className="label">Name <sub><small>{"(optional)"}</small></sub></div>
            <input placeholder="You can add your name" className="textFields text-slate-950 placeholder:text-slate-600" type="text" id="subject" value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div className="subject w-full lg:w-2/3 transition-all">
            <div className="label">Phone Number <sub><small>{"(optional)"}</small></sub></div>
            <input placeholder="You can add your contact details" className="textFields text-slate-950 placeholder:text-slate-600" type="text" id="subject" value={phone} onChange={(e) => setphone(e.target.value)} />
          </div>

          <div className="text-xl text-[#42445D] flex flex-col gap-3 w-full">
            <h1>Which of these departments does your feedback concern?</h1>
            <form action="" className=" flex flex-row justify-evenly px-24 items-center w-full gap-4 text-2xl font-semibold">
              <label class="flex flex-row gap-2 justify-center items-center ">
                <input type="checkbox" value={"Patrol Division"} className=" checked:text-slate-950 appearance-none h-3 w-3 bg-transparent border-2 border-[#42445D] checked:bg-[#42445D] rounded-sm scale-150  " onSelect={(e) => setdept((prev) => ([...prev, e.target.value]))} name="checkbox1" style={{}} />
                Patrol Division
              </label>
              <label class="flex flex-row gap-2 justify-center items-center">
                <input type="checkbox" value={"Records Division"} className=" checked:text-slate-950 appearance-none h-3 w-3 bg-transparent border-2 border-[#42445D] checked:bg-[#42445D] rounded-sm scale-150  " onSelect={(e) => setdept((prev) => ([...prev, e.target.value]))} name="checkbox2" />
                Records Division
              </label>
              <label class="flex flex-row gap-2 justify-center items-center">
                <input type="checkbox" value={"Prisoner Processing"} className=" checked:text-slate-950 appearance-none h-3 w-3 bg-transparent border-2 border-[#42445D] checked:bg-[#42445D] rounded-sm scale-150  " onSelect={(e) => setdept((prev) => ([...prev, e.target.value]))} name="checkbox3" />
                Prisoner Processing
              </label>
            </form>
          </div>
        
        <div className=" flex flex-col w-full gap-8 py-12 justify-center items-center">
        {extra&&
        extra.fields.map((el, index) => (
          <Field key={index} field={el} />
        ))}
        </div>
        </>}
        </div>

        <input type="file" ref={imageUpload} className=" hidden p-3 rounded-lg text-black w-full" onChange={handleFileChange}></input>
        <div className=" flex w-full justify-center items-center">
          {(file?.type.includes("image")) ? <img className=' py-10' src={img}></img>
            : (file?.type.includes("video")) ? <video className=' py-10' src={img}></video> :
              <></>}
        </div>
        <div className=" flex justify-between w-2/3 items-center gap-8 flex-row">
          <div onClick={() => { imageUpload.current.click() }} className=" hover:scale-90 w-fit flex flex-row gap-4 justify-center my-6 items-center text-xl font-semibold text-slate-950 py-2 px-4 transition-all cursor-pointer bg-slate-100 border-2 border-orange-600 hover:border-slate-100 hover:bg-orange-600 rounded-xl">
            <p className=" ">Add Attatchment</p>
            <img width={40} height={40} src="/add-image.png" alt="" />
          </div>
          <button onClick={() => { handleSubmit() }} className="font-bold text-2xl py-2 px-4 transition-all text-slate-950  bg-slate-100 border-2 border-green-600 hover:border-slate-100 hover:bg-green-600 rounded-xl scale-110 hover:scale-95 ">Submit</button>
        </div>
      </div>}
    </main>
  )
}
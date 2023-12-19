"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./feedback.css"
import Navbar from "../../components/Navbar"
import { redirect, useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import * as L from 'leaflet';
import Field from "./components/Field";
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
  const cloud_name = process.env.CLOUDINARY_LINK
  const [address, setAddress] = useState(null);
  const route = useRouter();
  const [extra, setextra] = useState(null)

  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setimg(URL.createObjectURL(e.target.files[0]));
  };

  const getData = async () => {
    console.log(id)
    const res = await fetch(`/api/station/${id}`, {
      method: "GET",
    });
    const data = await res.json()
    console.log(data)
    setStation(data.station)
    setLoading(false)
    
  }

  const getUserLocation = () => {
    if (window)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            
          },
          (err) => {
            alert(err.message);
            router.push("/")
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
        router.push("/")
      }
      console.log(latitude,longitude)
  }

  
  useEffect(() => {
    try {
      const getInitialData = async () => {
        
        const res = await fetch("/api/authority/form")
        const data = await res.json()
        setextra(data.form)
        
      };
      console.log("starting useeff")
      getInitialData(); 
      getData()
      getUserLocation()
    } catch (error) {
      console.trace(error);
    }
  }, []);

  const [lang, setlang] = useState("en")
  function areCoordinatesClose(coord1, coord2, threshold) {
    if (!coord1 || !coord2) {
      console.log("no coord")
      return false
    }
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const R = 6371; 

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

    const distance = R * c * 1000; 

    return distance < threshold;
  }

  const checkProximity = () => {
    const c1 = { latitude: station.latitude, longitude: station.longitude }
    
    
    const c2 = { latitude: latitude, longitude: longitude }
    if (!c2.latitude || !c2.longitude)
      return false
    const threshold = 100
    return areCoordinatesClose(c1, c2, threshold)
  }

  useEffect(() => {
    if(station)
    if(!checkProximity())
    alert("Please be in 100m range of police station")
  }, [desc])
  
  const handleSubmit = async () => {
    setLoading(true)
    if (!desc) {
      alert("Please enter a description")
      return
    }
    if (!checkProximity()) {
      alert("you need to in the 100m range of " + station?.name)
      router.push("/stations")
      return
    } else {
      let translatedDesc = desc
  
    console.log(translatedDesc)
      
      if (!!file) {
        try {
          const upload_preset = process.env.CLOUDINARY_PRESET
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', upload_preset);
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
            formData
          );
          console.log(response)
          
          if (response.statusText === "OK") {
            
            let savedId = localStorage.getItem("id")
            if(!savedId){
              const idData = (await axios.get("/api/user")).data
              savedId = idData.user._id
            }
            console.log(JSON.stringify({ description: translatedDesc, attachment: response.data.url, id: savedId, stationId: station._id, from:lang}))
            
            
            const resp = fetch("https://rakshakrita-api-v2.onrender.com/feedback", {
              method: "POST",
              headers :{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ description: translatedDesc?translatedDesc:desc, attachment: response.data.url, id: savedId, stationId: station._id,from:lang})
            })
            alert("Your feedback has been submitted")
            router.push("/stations")
            return
          }
        } catch (error) {
          console.error('Error uploading file to Cloudinary:', error);
        }
      } else {
        
    let savedId = localStorage.getItem("id")
            if(!savedId){
              const idData = (await axios.get("/api/user")).data
              savedId = idData.user._id
            }
            console.log(JSON.stringify({ description: translatedDesc, attachment: "", id: savedId, stationId: station._id, from:lang}))
            
            const resp =  fetch("https://rakshakrita-api-v2.onrender.com/feedback", {
              method: "POST",
              headers :{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ description: translatedDesc?translatedDesc:desc, attachment: "", id: savedId, stationId: station._id,from:lang})
            })
            alert("Your feedback has been submitted")
            route.push("/stations")
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
    
    
    const end = [parseFloat(latitude), parseFloat(longitude)]
    var map = L.map('map').setView(start, 50);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      
    }).addTo(map);
    var circle = L.circle(start, {
      color: 'green',
      fillColor: '#0f0',
      fillOpacity: 0.5,
      radius: 100
  }).addTo(map);
  var customIcon = L.icon({
    iconUrl: '/police-station.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  var customIcon2 = L.icon({
    iconUrl: '/location.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
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

    }
  }, [station, latitude])

  const addAudioElement = (blob) => {
    convertToBase64AndSend(blob);
  };

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        window.localStream = stream; 
        window.localAudio.srcObject = stream; 
        window.localAudio.autoplay = true; 
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
          {station?.latitude && <div id="map" className=" z-10 lg:w-2/3 w-11/12 rounded-xl my-8" style={{ height: "40vh" }}></div>}
        </div>
        <div className="form w-full">
          
    <Dictaphone setDesc={setDesc} setLang={setlang}/>
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
        <div className=" flex flex-col justify-center lg:justify-between w-2/3 items-center gap-3 lg:gap-8 lg:flex-row">
          <div onClick={() => { imageUpload.current.click() }} className=" hover:scale-90 w-fit flex flex-row gap-4 justify-center my-6 items-center text-lg lg:text-xl font-semibold text-slate-950 py-2 px-4 transition-all cursor-pointer bg-slate-100 border-2 border-orange-600 hover:border-slate-100 hover:bg-orange-600 rounded-xl">
            <p className=" ">Add Attatchment</p>
            <img className=" lg:scale-100 scale-60" width={40} height={40} src="/add-image.png" alt="" />
          </div>
          <button onClick={(e) => { e.preventDefault(); handleSubmit() }} className="font-bold text-lg lg:text-xl py-2 px-4 transition-all text-slate-950  bg-slate-100 border-2 border-green-600 hover:border-slate-100 hover:bg-green-600 rounded-xl scale-110 hover:scale-95 ">Submit</button>
        </div>
      </div>}
    </main>
  )
}
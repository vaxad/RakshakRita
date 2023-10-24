"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Page({params:{id}}) {
    const [station, setStation] = useState(null)
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null);
    const [img, setimg] = useState(null)
    const [attatch, setAttatch] = useState(null)
    const imageUpload = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const cloud_name = "db670bhmc"

  const [address, setAddress] = useState(null);

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(`https://ipapi.co/json/`);
        const data = await res.json();
        setAddress(data);
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
        console.log(data)
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
    
        const R  = 6371; // Earth's radius in kilometers
    
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
        const c1 = {latitude:station.latitudes, longitude:station.longitudes}
        const c2 = {latitude:latitude, longitude:longitude}
        if(!c2.latitude||!c2.longitude)
        return false
        const threshold = 100
        return areCoordinatesClose(c1,c2,threshold)
      }

      const handleSubmit = async() => {
        if(!desc){
            alert("Please enter a description")
            return
        }
        if(checkProximity()){
            alert("you need to in the 100m range of "+station?.name)
        }else { 
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
                        const resp = (await axios.post("/api/feedback",JSON.stringify({description:desc, attatchment:response.data.url, ip:address?.ip, stationId:station._id}))).data
                        if(resp.message){
                            alert(resp.message)
                        }else{
                          setDesc("")
                          setimg(null)
                          setFile(null)
                        }
                    console.log(resp)
                    }
                } catch (error) {
                  console.error('Error uploading file to Cloudinary:', error);
                }
              }else {
                const resp = (await axios.post("/api/feedback",JSON.stringify({description:desc, attatchment:"", ip:address?.ip, stationId:station._id}))).data
                console.log(resp)
                if(resp.message){
                  alert(resp.message)
              }else{
                setDesc("")
                setimg(null)
                setFile(null)
              }
              }
        }
      }

    return (
        <div className=" flex flex-col justify-center items-center p-24">
            <h1 className=" font-bold text-2xl">Feedback regarding {station?.name}</h1>
            <form onSubmit={(e)=>{
                e.preventDefault();
                handleSubmit();
            }} className=" flex flex-col justify-center items-center gap-4 w-full">
                <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">Feedback</h2>
            <textarea cols={30} type="text" className="p-3 rounded-lg text-black w-full" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>
          <div className=" flex flex-col w-full justify-center items-center gap-3">
            <h2 className=" text-lg font-medium ">attachments</h2>
            {(file?.type.includes("image")) ? <img className=' py-10' src={img}></img>
            :(file?.type.includes("video")) ? <video className=' py-10' src={img}></video>:
            <></>}

                <div onClick={() => { imageUpload.current.click() }} className=' w-11/12 py-6 md:py-12 rounded-lg cursor-pointer bg-green-500 hover:bg-green-300 flex justify-center items-center text-xl md:text-3xl transition-all font-bold'>
                    {!file ? 'ADD IMAGE' : 'CHANGE IMAGE'}{!file && <sup>*</sup>}
                </div>
                {/* <input id='imageUpload' ref={imageUpload} className=' hidden' onChange={(e) => { validateFileType(e) }} type='file'></input> */}
                
            <input type="file" ref={imageUpload}   className=" hidden p-3 rounded-lg text-black w-full" onChange={handleFileChange}></input>
          </div>
          <button type="submit" className=" px-4 py-2 mx-5 font-bold bg-blue-500 rounded-lg">Submit</button>

            </form>
        </div>
    )
}

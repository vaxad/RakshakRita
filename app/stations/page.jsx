"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import StationCard from "./components/StationCard";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

export default function Stations() {
  const [stations, setstations] = useState([])
  const [showstations, setshowstations] = useState([])
  const [search, setsearch] = useState([])

  const setMap = (stations) => {
    var container = L.DomUtil.get('map');

    if (container != null) {

      container._leaflet_id = null;

    }
    console.log("hello")
    var map = L.map('map').setView([stations[0].latitude, stations[0].longitude], 50);
    // Create an array to store the markers
    var markers = [];

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);
    // Loop through the coordinates array
    for (var i = 0; i < stations.length; i++) {
      var coordinate = [stations[i].latitude, stations[i].longitude];

      // Create a marker for each coordinate
      var marker = L.marker(coordinate).addTo(map);
      markers.push(marker);

      // Add a popup to each marker with coordinate information
      marker.bindPopup(stations[i].name);
    }
    var customIcon2 = L.icon({
      iconUrl: '/location.png',
      iconSize: [32, 32], // set the size of the icon
      iconAnchor: [16, 32], // set the anchor point
      popupAnchor: [0, -32], // set the popup anchor
    });
    const latitude = 21.170240     //temp
    const longitude = 72.831062    //temp
    var marker = L.marker([latitude, longitude], { icon: customIcon2 }).addTo(map).bindPopup("You are here");

    // Create a feature group from the array of markers
    var markerGroup = L.featureGroup(markers);

    // Fit the map to the bounds of the marker group
    map.fitBounds(markerGroup.getBounds());

  }


  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const getUserLocation = () => {
    if (window)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
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

  useEffect(() => {
    const getData = async () => {
      const resp = (await axios.get("/api/station")).data
      // setstations(resp.stations.slice(1, 15))
      // setshowstations(resp.stations.slice(1, 15))
      // setMap(resp.stations.slice(1, 100))
      const filteredStations = resp.stations.filter((el) => checkProximity({latitude2: el.latitude, longitude2: el.longitude}))

      setstations(filteredStations)
      setshowstations(filteredStations)
      setMap(filteredStations)
    }
    if(latitude && longitude)
    getData();
    getUserLocation();
  }, [latitude])





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

  const checkProximity = ({latitude2, longitude2}) => {
    console.log(latitude2, longitude2, latitude, longitude)
    if(!latitude2 || !longitude2){
      getUserLocation()

    }else{
    const c1 = { latitude: parseFloat(latitude2), longitude: parseFloat(longitude2) }
    const latitude = 21.170240     //temp
    const longitude = 72.831062    //temp
    const c2 = { latitude: latitude, longitude: longitude }
    if (!c2.latitude || !c2.longitude)
      return false
    const threshold = 1000
    return areCoordinatesClose(c1, c2, threshold)
    }
  }



  return (
    <main className="flex flex-col w-full home min-h-[100vh] overflow-y-scroll">
      <Navbar />

      <div className=" flex flex-col w-full ">

        <div className="filter flex flex-row flex-nowrap text-black w-full my-6 px-12 gap-5">
          <input type="text" className=" w-full py-3 px-6 border border-slate-400 rounded-2xl" placeholder="Search a Police Station..."></input>
          <form className=" flex flex-col justify-start max-w-fit h-full">
            {/* <label>Filter by</label> */}
            <select>
              <option className=" text-slate-300">Filter</option>
              <option>District</option>
              <option>Taluka</option>
              <option>City</option>
              <option>Town</option>
            </select>
          </form>
        </div>
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-12 md:px-12 px-4 pb-16 gap-6 w-full">
        { <div id="map" className=" z-10 col-span-3 rounded-xl my-8" style={{ height: "40vh" }}></div>}
          {stations.length === 0 ?
            (<div className=" col-span-3 w-full "><Loading /></div>) :
              stations.map((el) => {
                return (
                  <StationCard key={el._id} el={el} />
                )
              })}
        </div>
      </div>
    </main>
  )
}

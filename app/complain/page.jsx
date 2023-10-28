"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner'
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Location() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [c1, setc1] = useState(null);
  const [c2, setc2] = useState(null);
  const [error, setError] = useState(null);
  const [areClose, setAreClose] = useState(null);
  const [result, setResult] = useState(null);
  const route = useRouter();
  const handleScan = (data) => {
    if (data) {
      setResult(data);
      console.log(data)
      const data2 = (data.text)
      console.log(data2)
      const parts = data2.split("/");
      const stationId = parts[parts.length - 1];
      route.push(`/feedback/${stationId}`)
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    if (window)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setc1({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
      }
  }, []);

  function areCoordinatesClose(coord1, coord2, threshold) {
    if (!coord1 || !coord2) {
      console.log("no coord")
      return "false"
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

    return distance < threshold?"true":"false";
  }

  // Example usage:

  const threshold = 100; // 100 meters
  const checkCoordinates = (coord2) => {
    const areClose = areCoordinatesClose(c1, coord2, threshold);
    setAreClose(areClose)
    console.log(`Are the coordinates close? ${areClose}`);
  }

  return (
    <div className=' flex w-full flex-col  home min-h-[100vh]'>
      <Navbar/>
      <div className=' flex flex-col justify-center items-center gap-12 text-slate-950 text-xl font-semibold py-6 px-3'>
      {/* {latitude && longitude ? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
      {error && <p>Error: {error}</p>} */}
      <h1 className=' text-2xl font-bold text-slate-700 flex flex-row gap-5 items-center'>Scan the QR here 
      <span className='  text-4xl font-bold text-slate-900 flex flex-row gap-5 items-center'>OR</span>
      <span>
      <Link href={"/stations"} className=" px-5 py-2 rounded-xl bg-orange-500 lg:text-3xl text-xl hover:text-slate-50 hover:scale-105 font-bold transition-all">Browse Stations</Link>
        </span></h1>
      <div className=' flex w-full flex-col gap-8 justify-center items-center'>
        <div className=' flex lg:w-1/2 md:w-2/3 w-full relative justify-center items-center'>
        {!result && typeof window !== 'undefined' && <QrReader
          facingMode='user'
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />}
        <img src='/qrscan.png' className=' absolute h-full'></img>
        </div>
        {result && <p>QR Code Data: {JSON.stringify(result)}</p>}
        <p>{areClose?areClose!=="true"?`You should be under 100m radius of `:"":""}</p>
      </div>
      </div>
    </div>
  );
}

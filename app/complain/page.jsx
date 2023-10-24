"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner'

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

  // Example usage:

  const threshold = 100; // 100 meters
  const checkCoordinates = (coord2) => {
    const areClose = areCoordinatesClose(c1, coord2, threshold);
    setAreClose(areClose)
    console.log(`Are the coordinates close? ${areClose}`);
  }

  return (
    <div>
      {latitude && longitude ? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
      {error && <p>Error: {error}</p>}
      <div>
        {!result && typeof window !== 'undefined' && <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />}
        {result && <p>QR Code Data: {JSON.stringify(result)}</p>}
        <p>You are close: {JSON.stringify(areClose ? areClose : "false")}</p>


      </div>
    </div>
  );
}


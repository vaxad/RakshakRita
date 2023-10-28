// versi "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru
"use client"
import { useDebugValue, useEffect, useState } from "react";
// import {QrReader} from "react-qr-reader";
// import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  
  
  
  // const WebcamCapture = () => (
  //   <Webcam
  //     audio={false}
  //     height={720}
  //     screenshotFormat="image/jpeg"
  //     width={1280}
  //     videoConstraints={videoConstraints}
  //   >
  //     {({ getScreenshot }) => (
  //       <button
  //         onClick={() => {
  //           const imageSrc = getScreenshot()
  //         }}
  //       >
  //         Capture photo
  //       </button>
  //     )}
  //   </Webcam>
  // )

const QrScan = () => {
  useEffect(() => {
    if(navigator){
      navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );
    
    
    }
  }, [])
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          {/* <Webcam/> */}
          {/* <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }} */}
          {/* /> */}
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
  );
};

export default QrScan;

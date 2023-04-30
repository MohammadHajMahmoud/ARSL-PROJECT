import React, { useEffect,useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./cssFile/request.css"
export default function WebcamVideo() {
  const [count, setCount] = useState(3);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;
    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting, count]);

 

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
const  startRecoarding =()=>{
  setIsCounting(true);
  setCount(3);
  setTimeout(()=>{
    handleStartCaptureClick()
    setTimeout(()=>{
      handleStopCaptureClick()

    },2000)
  },3000)
}
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
      mediaRecorderRef.current.stop()
      setCapturing(false)
  
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });
      console.log(blob)
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: { ideal: 720 },
    height: { ideal: 720 },
    facingMode: "user",
    frameRate: { ideal: 15, max: 15 }

  };

  return (
    <center>
  <div className="webCon">
    <h1>{count}</h1>
      <Webcam
        className="webc"
        style={{background:"cover"}}
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      /> 
        <button onClick={startRecoarding}>Start Capture</button>
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
      
    </div>
    </center>
    
  );
}
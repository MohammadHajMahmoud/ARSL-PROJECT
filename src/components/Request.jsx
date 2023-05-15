import React, { useEffect,useCallback, useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import "./cssFile/request.css";

export default function Request() {
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
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleStartCaptureClick = React.useCallback(() => {
    setRecordedChunks([]);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecordedChunks, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
  }, [mediaRecorderRef]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      
      const formData = new FormData();
      formData.append('video', blob, 'video.mp4');
      formData.append('title', 'My video title');
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:8080/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleHideVideo = () => {
    setShowVideo(false);
  };
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
  return (
    <div>
      <h1>{count}</h1>
      {!showVideo && (
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints = {{
            frameRate: { ideal: 15, max: 15 }
          }}
        />
      )}
      <div>
        {!showVideo && (
          <button onClick={startRecoarding}>Start Recording</button>
        )}
       
        {!showVideo && (
          <button onClick={handleShowVideo}>Show Video</button>
        )}
        {showVideo && (
          <button onClick={handleHideVideo}>Go back to camera</button>
        )}
        {!showVideo && recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </div>
      {showVideo && (
        <video
          controls
          src={URL.createObjectURL(
            new Blob(recordedChunks, {
              type: 'video/webm',
            })
          )}
        />
      )}
    </div>
  );
}


import React, { useEffect, useCallback, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import axios from "axios";
import Webcam from "react-webcam";
import "./cssFile/request.css";
export default function UploadVideo() {
  let {word} = useParams();
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
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
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
        type: "video/webm",
      });

      const formData = new FormData();
      formData.append("video", blob, "video.mp4");
      formData.append("title", word);
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:8080/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleHideVideo = () => {
    setShowVideo(false);
  };
  const startRecoarding = () => {
    setIsCounting(true);
    setCount(3);
    setTimeout(() => {
      handleStartCaptureClick();
      setTimeout(() => {
        handleStopCaptureClick();
      }, 2000);
    }, 3000);
  };
  return (
    <div className="reqWebCon">
      {!showVideo && <div className="cnt">{count}</div>}
      {!showVideo && (
        <Webcam
          className="reqWebc"
          audio={false}
          ref={webcamRef}
          videoConstraints={{
            frameRate: { ideal: 15, max: 15 },
          }}
        />
      )}
      {showVideo && (
        <video
          className="reqWebc"
          controls
          src={URL.createObjectURL(
            new Blob(recordedChunks, {
              type: "video/webm",
            })
          )}
        />
      )}
      <div className="reQbuttons">
        {!showVideo && (
          <button className="bot" onClick={startRecoarding}>
            Start Recording
          </button>
        )}

        {!showVideo && (
          <button className="bot" onClick={handleShowVideo}>
            Show Video
          </button>
        )}
        {showVideo && (
          <button className="bot" onClick={handleHideVideo}>
            Go back to camera
          </button>
        )}
        {!showVideo && recordedChunks.length > 0 && (
          <button className="bot" onClick={handleDownload}>
            submit
          </button>
        )}
      </div>
    </div>
  );
}

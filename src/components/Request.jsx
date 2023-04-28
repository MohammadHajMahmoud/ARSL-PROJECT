import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import HolisticModel from "./HolisticModel";
import formatResult from "./formatResult";
import background from "./cssFile/flip-camera-icon-4.png";
import "./cssFile/camera.css";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
const COUNTDOWN_TIMEOUT = 3;
function Request() {
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const webcamRef = useRef(null);
  var frames = [];
  // var isRecording = false;
  // const [isRecording, setIsRecording] = useState(false);

  
  const toggleFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER
    );
  }


  const [timeLeft, setTimeLeft] = useState(-1);

  function startCountDown(){
    setTimeLeft(COUNTDOWN_TIMEOUT);
  }


  const startRecoarding = () => {
    console.log("started recording")
    frames=[]
  };



  useEffect(() => {
    if (timeLeft < 1)
      return

    // Save intervalId to clear the interval when the component unmounts
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear intervalId when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft === 0){
      startRecoarding();
    }

  }, [timeLeft]);




  useEffect(() => {

    const holistic = HolisticModel((res) => {
      frames.push(formatResult(res))
      console.log(frames)    
    });

    console.log("yes epic")
    while (!(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ))
; 
    
      new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
            if(frames.length < 30){
                await holistic.send({ image: webcamRef.current.video })
            }
        },
      }).start();
    
  }, []);

  return (
    <center>
      <div className="webCon">
        <Webcam
          className="webc"
          videoConstraints={{ facingMode }}
          ref={webcamRef}
        />
      </div>
      <div>
        <button onClick={startRecoarding}>Recoard</button>
        <img src={background} onClick={toggleFacingMode} />
        <h1>{timeLeft}</h1>
      </div>
    </center>
  );
}

export default Request ;

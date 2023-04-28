import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import HolisticModel from "./HolisticModel";
import SocketIoClient from "./SocketIoClient";
import formatResult from "./formatResult";
import background from "./cssFile/flip-camera-icon-4.png";
import "./cssFile/camera.css";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function CameraScreen() {
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const webcamRef = useRef(null);
  var framesArray = [];
  const [count, setCount] = useState(3);
  const[startedRecoarding,setStartedRecoarding]=useState(false)
  const [isCounting, setIsCounting] = useState(false);
  const toggleFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER
    );
  };
  useEffect(() => {
    let timer;
    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [count, isCounting]);

  const startRecoarding = async () => {
    framesArray=[]
    setStartedRecoarding(true)
    setIsCounting(true);
  };

  useEffect(() => {
    const holistic = HolisticModel((res) => {
        if(framesArray.length!==30){
            framesArray.push(formatResult(res))
        }
        else{
            console.log(framesArray)
            setStartedRecoarding(false)
            setCount(3)
            setIsCounting(false);
        }
    });

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
            if(startedRecoarding ){
                await holistic.send({ image: webcamRef.current.video })
            }
        },
      }).start();
    }
  }, [startedRecoarding]);

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
        <h1>{count}</h1>
      </div>
    </center>
  );
}
export default CameraScreen;

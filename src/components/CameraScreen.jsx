import { useEffect, useRef, useState} from 'react';
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import HolisticModel from './HolisticModel';
import SocketIoClient from './SocketIoClient';
import formatResult from './formatResult';
import background from "./cssFile/flip-camera-icon-4.png" 
import "./cssFile/camera.css"
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function CameraScreen() {  
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const webcamRef = useRef(null);

  const toggleFacingMode = () => {
    setFacingMode( prevMode => prevMode === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER);
  };
  
  useEffect(() => {
    const socketClient = SocketIoClient((word)=>{
      console.log(word)
    });
    let frameNumber = 0;
    const holistic = HolisticModel( 
      result => {
        let requestBody = {
          'frameNumber': frameNumber++,
          'frame': formatResult(result),
        };
        socketClient.emit('request', requestBody)
      });
      
    let isProcessing = false;
    const onFrame = async () => {
      if (!isProcessing) {
        isProcessing = true;
        setTimeout(async () => {
          await holistic.send({ image: webcamRef.current.video });
          isProcessing = false;
        }, 33);
      }
    }
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      new cam.Camera(webcamRef.current.video, {
        onFrame: onFrame,
       
      }).start();
    }
  }, []);

  const videoConstraints = {
    width: { ideal: 720 },
    height: { ideal: 720 },
    facingMode: facingMode,
    frameRate: { ideal: 15, max: 15 }
  };
  
  return (
    <center>
      <div className="webCon">
        <Webcam className='webc'
        ref={webcamRef}
        audio={false}
        mirrored = {true}
        videoConstraints={videoConstraints}
        />
      </div>
      <div>
        <img src={background} onClick={toggleFacingMode}/>
      </div>
    </center>
  )
}
export default CameraScreen;
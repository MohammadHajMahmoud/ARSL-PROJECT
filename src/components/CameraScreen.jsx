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

    const holistic = HolisticModel( 
      res => socketClient.emit('request', formatResult(res))
      );

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      new cam.Camera(webcamRef.current.video, {
        onFrame: async () => await holistic.send({ image: webcamRef.current.video }),
       
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
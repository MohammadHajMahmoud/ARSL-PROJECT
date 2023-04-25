import { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import HolisticModel from './HolisticModel';
import SocketIoClient from './SocketIoClient';

function CameraScreen() {  
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const videoRef = useRef();
  const webcamRef = useRef(null);
    
  var camera = null;
  useEffect(() => {
    const socketClient = SocketIoClient();

    const holistic = HolisticModel( res => {
      socketClient.emit('request', res);
      console.log(res);
    });

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => await holistic.send({ image: webcamRef.current.video }),
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <center>
      <div className="App">
        <Webcam 
        ref={webcamRef}
        style = {{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}/>
      </div>
    </center>
  )
}
export default CameraScreen;
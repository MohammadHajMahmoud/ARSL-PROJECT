import { useEffect, useRef, useState} from 'react';
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import HolisticModel from './HolisticModel';
import SocketIoClient from './SocketIoClient';
import formatResult from './formatResult';

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function CameraScreen() {  
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const webcamRef = useRef(null);

  const toggleFacingMode = () => {
    setFacingMode( prevMode => prevMode === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER);
  };

  useEffect(() => {
    const socketClient = SocketIoClient();

    const holistic = HolisticModel( 
      res => socketClient.emit('request', formatResult(res))
      );

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      new cam.Camera(webcamRef.current.video, {
        onFrame: async () => await holistic.send({ image: webcamRef.current.video }),
        width: 640,
        height: 480,
      }).start();
    }
  }, []);

  return (
    <center>
      <div className="App">
        <Webcam 
        videoConstraints={{ facingMode }}
        ref={webcamRef}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
          }}
        />
      </div>
      <div>
        <button onClick={toggleFacingMode}>Switch camera</button>
      </div>
    </center>
  )
}
export default CameraScreen;
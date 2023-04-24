import { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import {Holistic,POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS} from "@mediapipe/holistic";
function CameraScreen() {  
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const videoRef = useRef();
  const webcamRef = useRef(null);
    
  var camera = null;
  useEffect(() => {
     
    const holistic = new Holistic({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    }});
    holistic.setOptions({modelComplexity: 1, 
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    function onResults(results){
      console.log(results)
    }
    holistic.onResults(onResults);

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
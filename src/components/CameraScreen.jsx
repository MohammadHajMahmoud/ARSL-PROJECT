import { useEffect, useRef, useState ,useCallback} from 'react';
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import {Holistic,POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS} from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'
import { Pose, LandmarkGrid, PoseConfig } from '@mediapipe/pose'
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment"
function CameraScreen() {  
  const [facingMode, setFacingMode] = useState("user");
  const videoRef = useRef();
    const webcamRef = useRef(null);

  
    const toggleFacingMode = () => {
      setFacingMode((prevMode) => prevMode === 'user' ? 'environment' : 'user');
    };
    var camera = null;
    useEffect(() => {
     
        const holistic = new Holistic({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
          }});
          holistic.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            refineFaceLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });
          function onResults(results){
            
            console.log(results)

            
          }
          holistic.onResults(onResults);
    
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null
        ) {
          camera = new cam.Camera(webcamRef.current.video, {
            onFrame: async () => {
              await holistic.send({ image: webcamRef.current.video,});
            },
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
            />  </div> 
            <div>
            <button onClick={toggleFacingMode}>Switch camera</button>
            </div>
            </center>
      )
}
export default CameraScreen;
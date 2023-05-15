import { useEffect, useRef, useState} from 'react';
import {Camera} from "@mediapipe/camera_utils";
import HolisticModel from './HolisticModel';
import SocketIoClient from './SocketIoClient';
import formatResult from './formatResult';
import background from "./cssFile/flip-camera-icon-4.png" 
import "./cssFile/camera.css"

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function CameraScreen() {  
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [responseWords, setResponseWords] = useState([]);
  const videoRef = useRef(null);
  const cameraRef = useRef(null);

  
  useEffect(() => {
    const socketClient = SocketIoClient( (word) => {
      setResponseWords((state) => state.slice(-4).concat(word));
    });

    const holistic = HolisticModel( (result) => {
        socketClient.emit('request', {
          'frame': formatResult(result),
        });
      });
      
    cameraRef.current = new Camera(videoRef.current , {
      onFrame: async () => {
          await holistic.send({ image: videoRef.current });
      },
      facingMode: facingMode,
    });
    cameraRef.current.start();
  
    return () => {
      socketClient.disconnect();
      holistic.close();
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    }
  }, []);
  
  return (
    <center>
      <div className="webCon">
        <video className='webc'
        ref = {videoRef}
        muted={true}
        
        />
        <div className ='resultCon'>
        <textarea className='result' value={responseWords.join(' ')} readOnly />
        </div>
      </div>
      <div>
        <img className='imgToggle' src={background} onClick={ () => {
          setFacingMode( (prevMode) => 
            prevMode === FACING_MODE_ENVIRONMENT ? 
            FACING_MODE_USER : 
            FACING_MODE_ENVIRONMENT
            );
        }}/>
      </div>
    </center>
  )
}
export default CameraScreen;
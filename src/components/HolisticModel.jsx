import {Holistic} from "@mediapipe/holistic";

function HolisticModel(onResult = console.log){

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
    
    holistic.onResults(onResult);
  return holistic
}

export default HolisticModel;
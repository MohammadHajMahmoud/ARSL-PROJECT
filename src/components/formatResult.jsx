const toHandLandmark = (landmark) => {
    return {
        x: landmark.x,
        y: landmark.y,
        z: landmark.z,
    }
}

const formatResult = (result) => {
    return {
        poseLandmarks: 
            result.poseLandmarks ?? Array(33).fill({x:0, y:0, z:0, visibility:0}),
        leftHandLandmarks: 
            (result.leftHandLandmarks ?? Array(21).fill({x:0, y:0, z:0})).map(toHandLandmark),
        rightHandLandmarks: 
            (result.rightHandLandmarks ??  Array(21).fill({x:0, y:0, z:0})).map(toHandLandmark),
    }
}

export default formatResult;
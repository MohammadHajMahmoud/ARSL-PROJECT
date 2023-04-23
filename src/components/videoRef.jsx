import React from "react";

function VideoDisplay({ videoRef }) {
  return (
    <div>
      <h2>Video Display</h2>
      <video style={{
          width: 640,
          height: 480,
        }}  ref={videoRef} autoPlay />
    </div>
  );
}

export default VideoDisplay;
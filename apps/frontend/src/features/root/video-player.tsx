import { useRef, useEffect, useState } from "react";

const VideoPlayer = ({
  srcObjects,
  index,
}: {
  srcObjects: { videoStream: MediaStream }[];
  index: number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && srcObjects.length > 0) {
      videoRef.current.srcObject = srcObjects[index].videoStream;
    }
  }, [srcObjects, index]);

  return (
    <div>
      <video ref={videoRef} autoPlay controls />
    </div>
  );
};

export default VideoPlayer;

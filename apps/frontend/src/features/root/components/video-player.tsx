import { useRef, useEffect } from "react";

const VideoPlayer = ({ srcObject }: { srcObject: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = srcObject;
    }
  }, [srcObject]);

  return <video ref={videoRef} autoPlay controls />;
};

export default VideoPlayer;

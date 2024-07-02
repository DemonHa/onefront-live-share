import { useEffect, useRef } from "react";

const Root = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    try {
      // Request screen capture of the current tab
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        });
    } catch (err) {
      console.error("Error: " + err);
    }
  }, []);

  return <video ref={videoRef} width="640" height="480" autoPlay></video>;
};

export default Root;

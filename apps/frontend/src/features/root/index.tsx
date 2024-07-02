import { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";

const Root = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [peer] = useState(
    new Peer(undefined as unknown as string, {
      host: "/",
      port: 3001,
    })
  );

  const [peers, setPeers] = useState<{ videoStream: MediaStream }[]>([]);

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

          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              setPeers([{ videoStream: userVideoStream }]);
            });
          });
        });
    } catch (err) {
      console.error("Error: " + err);
    }
  }, [peer]);

  return (
    <>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      {peers.map(() => (
        <></>
      ))}
    </>
  );
};

export default Root;

import { useEffect, useRef } from "react";
import { useState } from "react";
import VideoPlayer from "./components/video-player";
import { socket } from "@/socket";
import { peer } from "@/peer";

const Root = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [peers, setPeers] = useState<{ videoStream: MediaStream }[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [peersMap] = useState<Record<string, any>>({});

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
              setPeers([...peers, { videoStream: userVideoStream }]);
            });
          });

          socket.on("user-connected", (userId) => {
            const call = peer.call(userId, stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
              setPeers([...peers, { videoStream: userVideoStream }]);
            });
            call.on("close", () => {
              video.remove();
            });

            peersMap[userId] = call;
          });
        });
    } catch (err) {
      console.error("Error: " + err);
    }

    peer.on("open", (id) => {
      socket.emit("join-room", "root1", id);
    });

    socket.on("user-disconnected", (userId) => {
      if (peersMap[userId]) peersMap[userId].close();
    });
  }, [peers, peersMap]);

  return (
    <>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      {peers.map((peer, idx) => (
        <VideoPlayer key={idx} srcObject={peer.videoStream} />
      ))}
    </>
  );
};

export default Root;

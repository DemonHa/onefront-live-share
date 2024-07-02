import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import { useState } from "react";
import VideoPlayer from "./video-player";
import config from "@/config";

const Root = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [peer] = useState(
    new Peer(undefined as unknown as string, {
      host: config.peerjs.host,
      port: config.peerjs.port,
    })
  );

  const [peers, setPeers] = useState<{ videoStream: MediaStream }[]>([]);
  const [peersMap] = useState<Record<string, any>>({});

  useEffect(() => {
    const socket = io(config.socket.url);

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
  }, [peer]);

  return (
    <>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      {peers.map((_, idx) => (
        <VideoPlayer index={idx} srcObjects={peers} />
      ))}
    </>
  );
};

export default Root;

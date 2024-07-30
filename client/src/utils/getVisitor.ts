import SimplePeer from "simple-peer";
import { backendAPI } from "./backendAPI";

export const getVisitor = async (iceServers: []) => {
  try {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      streams: [],
      config: {
        iceServers,
      },
    });
    console.log("peer", peer);

    peer.on("signal", (signal) => {
      console.log("SIGNAL", JSON.stringify(signal));
      try {
        backendAPI.put("signal", { signal });
      } catch (error) {}
    });

    peer.on("data", (data) => {
      console.log("data: " + data);
    });

    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

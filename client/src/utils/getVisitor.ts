import SimplePeer from "simple-peer";
import { backendAPI } from "./backendAPI";

export const getVisitor = async (iceServers: [], gameEngineId?: string) => {
  try {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      streams: [],
      config: {
        iceServers: [],
      },
    });
    console.log("peer", peer);

    peer.on("signal", async (signal) => {
      console.log("SIGNAL", JSON.stringify(signal));
      try {
        const response = await backendAPI.put("signal", { signal });

        if (!response.data.success) {
          console.error("Unable to get answer signal");
          return;
        }

        const { answerSignal } = response.data;
        console.log("received answer:", answerSignal);

        peer.signal(answerSignal);
      } catch (error) {}
    });

    peer.on("data", (data) => {
      console.log("data: " + data);
      const payload = {
        eventId: "iframeResponse",
        gameEngineId: gameEngineId,
        payload: {
          var1: "howdy yall!",
        },
      };
      peer.send(JSON.stringify(payload));
    });

    peer.on("connect", () => {
      console.log("connect");
    });

    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

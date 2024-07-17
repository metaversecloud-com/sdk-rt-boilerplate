import { Topia, VisitorFactory } from "@rtsdk/topia";

export const getVisitor = async (
  credentials: { interactiveNonce: string; interactivePublicKey: string; visitorId: number; urlSlug: string },
  iceServers: [],
) => {
  try {
    const { visitorId, urlSlug } = credentials;

    const config = {
      apiDomain: process.env.REACT_APP_INSTANCE_DOMAIN || "api.topia.io",
      apiProtocol: process.env.REACT_APP_INSTANCE_PROTOCOL || "https",
      interactiveKey: process.env.REACT_APP_INTERACTIVE_KEY,
      interactiveSecret: process.env.REACT_APP_INTERACTIVE_SECRET,
    };

    const topia = new Topia(config);

    // const WebRTCConnector = new WebRTCConnectorFactory(topia);
    // const webRTCConnector = await WebRTCConnector.create({ credentials, twilioConfig });

    const visitor = await new VisitorFactory(topia).create(visitorId, urlSlug);
    visitor.connectWebRTC(iceServers, (data: any) => {
      console.log(data);
    });

    return visitor;
  } catch (error) {
    console.error(error);
  }
};

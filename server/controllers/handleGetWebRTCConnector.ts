import { Request, Response } from "express";
import { errorHandler, getCredentials, WebRTCConnector } from "../utils/index.js";

export const handleGetWebRTCConnector = async (req: Request, res: Response): Promise<Record<string, any> | void> => {
  try {
    const credentials = getCredentials(req.query);

    const webRTCConnector = await WebRTCConnector.create({ credentials });
    await webRTCConnector.getTwilioConfig();

    return res.json({ webRTCConnector, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleGetTwilioConfig",
      message: "Error setting up WebRTCConnector",
      req,
      res,
    });
  }
};

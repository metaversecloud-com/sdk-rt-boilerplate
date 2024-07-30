import { Request, Response } from "express";
import { errorHandler, getCredentials, Visitor } from "../utils/index.js";

export const handleSendSignal = async (req: Request, res: Response): Promise<Record<string, any> | void> => {
  try {
    const credentials = getCredentials(req.query);
    const { visitorId, urlSlug } = credentials;

    const visitor = await Visitor.create(visitorId, urlSlug);
    visitor.sendSignalToVisitor(req.body.signal, (data: any) => {
      console.log("callback", data);
    });

    return res.json({ success: true });
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

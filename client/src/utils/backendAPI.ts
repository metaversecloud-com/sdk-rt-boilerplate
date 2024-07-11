import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { InteractiveParams } from "../context/types";

const BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";
let backendAPI: AxiosInstance = axios;

const setupBackendAPI = async (interactiveParams: InteractiveParams) => {
  backendAPI = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Only do this if have interactive nonce.
  if (interactiveParams.assetId) {
    backendAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (!config?.params) config.params = {};
      config.params = { ...config.params };
      config.params["assetId"] = interactiveParams.assetId;
      config.params["displayName"] = interactiveParams.displayName;
      config.params["identityId"] = interactiveParams.identityId;
      config.params["interactiveNonce"] = interactiveParams.interactiveNonce;
      config.params["interactivePublicKey"] = interactiveParams.interactivePublicKey;
      config.params["profileId"] = interactiveParams.profileId;
      config.params["sceneDropId"] = interactiveParams.sceneDropId;
      config.params["uniqueName"] = interactiveParams.uniqueName;
      config.params["urlSlug"] = interactiveParams.urlSlug;
      config.params["username"] = interactiveParams.username;
      config.params["visitorId"] = interactiveParams.visitorId;
      return config;
    });
  }
};

export { backendAPI, setupBackendAPI };

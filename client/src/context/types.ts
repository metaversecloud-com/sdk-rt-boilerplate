export const SET_HAS_SETUP_BACKEND = "SET_HAS_SETUP_BACKEND";
export const SET_INTERACTIVE_PARAMS = "SET_INTERACTIVE_PARAMS";
export const SET_WEB_RTC_CONNECTOR = "SET_WEB_RTC_CONNECTOR";

export type InteractiveParams = {
  assetId: string;
  displayName: string;
  identityId: string;
  interactiveNonce: string;
  interactivePublicKey: string;
  profileId: string;
  sceneDropId: string;
  uniqueName: string;
  urlSlug: string;
  username: string;
  visitorId: string;
  gameEngineId?: string;
  iframeId?: string;
  hasDataChannel?: string;
};

export interface InitialState {
  hasInteractiveParams: boolean;
  hasSetupBackend: boolean;
}

export type ActionType = {
  type: string;
  payload?: object;
};

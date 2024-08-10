import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";

// pages
import Home from "@pages/Home";
import Error from "@pages/Error";

// context
import { GlobalDispatchContext } from "./context/GlobalContext";
import { InteractiveParams, SET_HAS_SETUP_BACKEND, SET_INTERACTIVE_PARAMS } from "./context/types";

// utils
import { backendAPI, setupBackendAPI } from "@/utils/backendAPI";
import { getVisitor } from "./utils/getVisitor";

const App = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hasInitBackendAPI, setHasInitBackendAPI] = useState(false);
  const [hasSetupSignal, setHasSetupSignal] = useState(false);

  const dispatch = useContext(GlobalDispatchContext);

  const interactiveParams: InteractiveParams = useMemo(() => {
    return {
      assetId: searchParams.get("assetId") || "",
      displayName: searchParams.get("displayName") || "",
      identityId: searchParams.get("identityId") || "",
      interactiveNonce: searchParams.get("interactiveNonce") || "",
      interactivePublicKey: searchParams.get("interactivePublicKey") || "",
      profileId: searchParams.get("profileId") || "",
      sceneDropId: searchParams.get("sceneDropId") || "",
      uniqueName: searchParams.get("uniqueName") || "",
      urlSlug: searchParams.get("urlSlug") || "",
      username: searchParams.get("username") || "",
      visitorId: searchParams.get("visitorId") || "",
      gameEngineId: searchParams.get("gameEngineId") || "",
      iframeId: searchParams.get("iframeId") || "",
      hasDataChannel: searchParams.get("hasDataChannel") || "",
    };
  }, [searchParams]);

  const setInteractiveParams = useCallback(
    ({
      assetId,
      displayName,
      identityId,
      interactiveNonce,
      interactivePublicKey,
      profileId,
      sceneDropId,
      uniqueName,
      urlSlug,
      username,
      visitorId,
      gameEngineId,
      iframeId,
      hasDataChannel,
    }: InteractiveParams) => {
      const isInteractiveIframe = visitorId && interactiveNonce && interactivePublicKey && assetId;
      dispatch!({
        type: SET_INTERACTIVE_PARAMS,
        payload: {
          assetId,
          displayName,
          identityId,
          interactiveNonce,
          interactivePublicKey,
          isInteractiveIframe,
          profileId,
          sceneDropId,
          uniqueName,
          urlSlug,
          username,
          visitorId,
          gameEngineId,
          iframeId,
          hasDataChannel,
        },
      });
    },
    [dispatch],
  );

  const setHasSetupBackend = useCallback(
    (success: boolean) => {
      dispatch!({
        type: SET_HAS_SETUP_BACKEND,
        payload: { hasSetupBackend: success },
      });
    },
    [dispatch],
  );

  const setupBackend = () => {
    setupBackendAPI(interactiveParams)
      .then(() => setHasSetupBackend(true))
      .catch(() => navigate("*"))
      .finally(() => setHasInitBackendAPI(true));
  };

  useEffect(() => {
    if (interactiveParams.assetId) {
      setInteractiveParams({
        ...interactiveParams,
      });
    }
  }, [interactiveParams, setInteractiveParams]);

  const setupWebRTC = (interactiveParams: any) => {
    backendAPI
      .get("/ice-servers")
      .then((result) => {
        getVisitor(result.data.iceServers, interactiveParams.gameEngineId)
          .then(() => {
            setHasSetupSignal(true);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!hasInitBackendAPI) setupBackend();
    else if (interactiveParams.hasDataChannel === "true" && !hasSetupSignal) setupWebRTC(interactiveParams);
  }, [hasInitBackendAPI, interactiveParams]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;

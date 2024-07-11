import { useContext, useState } from "react";

// context
import { GlobalStateContext } from "@/context/GlobalContext";

// components
import { Loading } from "@/components/Loading";

// utils
import { backendAPI } from "@/utils/backendAPI";

const Home = () => {
  const [droppedAsset, setDroppedAsset] = useState({ assetName: "", bottomLayerURL: "", id: null, topLayerURL: null });

  const { hasInteractiveParams, hasSetupBackend } = useContext(GlobalStateContext);

  const handleGetDroppedAsset = async () => {
    backendAPI.get("/dropped-asset")
      .then((result) => setDroppedAsset(result.data.droppedAsset))
      .catch((error) => console.error(error))
  };

  if (!hasSetupBackend) return <Loading />;

  return (
    <div className="container p-6 flex items-center justify-start">
      <div className="flex flex-col">
        <h1 className="h2">Server side example using interactive parameters</h1>
        <div className="max-w-screen-lg">
          {!hasInteractiveParams ? (
            <p>
              Edit an asset in your world and open the Links page in the Modify Asset drawer and add a link to your
              website or use &quot;http://localhost:3000&quot; for testing locally. You can also add assetId,
              interactiveNonce, interactivePublicKey, urlSlug, and visitorId directly to the URL as search parameters to
              use this feature.
            </p>
          ) : (
            <p className="my-4">Interactive parameters found, nice work!</p>
          )}
        </div>

        <button className="btn" onClick={handleGetDroppedAsset}>
          Get Dropped Asset Details
        </button>
        {droppedAsset.id && (
          <div className="flex flex-col w-full items-start">
            <p className="mt-4 mb-2">
              You have successfully retrieved the dropped asset details for {droppedAsset.assetName}!
            </p>
            <img
              className="w-96 h-96 object-cover rounded-2xl my-4"
              alt="preview"
              src={droppedAsset.topLayerURL || droppedAsset.bottomLayerURL}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

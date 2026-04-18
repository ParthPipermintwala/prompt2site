import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./components/common/Loader";
import { Outlet, useNavigation } from "react-router-dom";
import "./index.css";

const subscribeToBootState = (callback) => {
  window.addEventListener("load", callback);
  return () => window.removeEventListener("load", callback);
};

const getBootState = () => document.readyState !== "complete";

export default function App() {
  const navigation = useNavigation();
  const isBootLoading = React.useSyncExternalStore(
    subscribeToBootState,
    getBootState,
    () => true,
  );
  const isLoading = isBootLoading || navigation.state !== "idle";

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {isLoading && <Loader />}

      <div
        className="relative z-10 min-h-screen isolate overflow-hidden select-none bg-[#120f17]"
        onContextMenu={(e) => e.preventDefault()}
      >
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  );
}

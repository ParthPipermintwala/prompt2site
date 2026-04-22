import React, { useEffect, useState } from "react";
import "./index.css";
import { Outlet, useNavigation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./components/common/Loader";
import { Provider } from "react-redux";
import { store } from "./app/store";

export default function App() {
  const navigation = useNavigation();
  //only for first load
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsInitialLoading(false);

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  //consider loading when the app is first loaded or when navigating to a new route
  const isLoading = isInitialLoading || navigation.state === "loading";

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {isLoading && <Loader />}
        <div
          className="relative z-10 min-h-screen isolate overflow-hidden select-none bg-[#120f17]"
          onContextMenu={(e) => e.preventDefault()}
        >
          <Outlet />
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
}

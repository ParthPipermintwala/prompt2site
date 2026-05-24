import React, { useEffect, useState } from "react";
import "./index.css";
import { Outlet, useNavigation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./components/common/Loader";
import { Provider } from "react-redux";
import { store } from "./app/store";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function App() {
  const navigation = useNavigation();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = isInitialLoading || navigation.state === "loading";

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {isLoading && <Loader />}
        <div
          className="relative z-10 min-h-screen isolate select-none bg-[#120f17]"
          onContextMenu={(e) => e.preventDefault()}
        >
          <Outlet />
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
}
